import './global.less';
import './colors.less';

import { Map } from './map';
import { FlowMap } from './maps/flow-map';
import { NecklaceMap } from './maps/necklace-map';
import { SimpleSets } from './maps/simple-sets';

import { MenuBar, MenuButton } from './ui/menu-bar';
import { TypeSelector } from './ui/type-selector';

class CartoCrow {
	maps: Map[] = [];

	constructor () {
		this.maps.push(new NecklaceMap());
		this.maps.push(new FlowMap());
		this.maps.push(new SimpleSets());
		this.loadMap(this.maps[0]);

		$('#overlay').on('click', (e: JQuery.ClickEvent) => {
			if (e.target === e.currentTarget) {
				$('#overlay').removeClass('shown');
			}
		});
	}

	loadMap(map: Map) {
		$('#side-panel-container').empty();
		$('#side-panel-container').append(map.sidePanel.$element);

		const menu = new MenuBar();
		const $header = $('#header');
		$header.empty();
		menu.$element.appendTo($header);

		menu.add(new TypeSelector(this.maps, map, (map: Map) => {
			this.loadMap(map);
		}));
		menu.addSeparator();
		menu.add(new MenuButton('Export', () => {
			console.log('Exporting...');
		}));
		menu.add(new MenuButton('Help', () => {
			console.log('Helping...');
		}));
	}
};

$(() => {
	new CartoCrow();
});
