import './side-panel.less';

export class SidePanel {
	$element: JQuery;

	constructor(html: string) {
		this.$element = $('<div/>').addClass('side-panel')
			.html(html);
	}
}
