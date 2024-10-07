const express = require('express');
const app = express();
const port = 3000;
const { spawn } = require('child_process');
const tmp = require('tmp');
const fs = require('fs');

app.get('/api/cartocrow', (req, res) => {
	const inputFileName = tmp.tmpNameSync({
		'postfix': '.json'
	});
	const outputFileName = tmp.tmpNameSync({
		'postfix': '.svg'
	});
	let params;
	try {
		params = JSON.parse(req['query']['params']);
	} catch (e) {
		res.sendStatus(400);
		res.send();
		return;
	}
	fs.writeFileSync(inputFileName, JSON.stringify(params));
	const cartocrow = spawn('./cartocrow', [inputFileName, outputFileName],
		{
			'cwd': './server',
			'timeout': 10000
		}
	);
	// FIXME:
	//     This has a path traversal vulnerability where every path could be
	//     specified for the input map. Either the cartocrow frontend, or the
	//     server code here, should sanitize this.

	cartocrow.stderr.on('data', (data) => {
		console.log(data.toString());
	});
	cartocrow.on('close', () => {
		console.log('done!');
		res.sendFile(outputFileName);
	});
});

const staticRoot = './dist';
app.use(express.static(staticRoot));

app.listen(port, () => {
	console.log('cartocrow-web listening on port ' + port);
});
