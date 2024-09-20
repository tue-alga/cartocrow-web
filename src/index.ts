import './global.less';
import './colors.less';

import { Map } from './map';
import { FlowMap } from './maps/flow-map';
import { NecklaceMap } from './maps/necklace-map';
import { SimpleSets } from './maps/simple-sets';

import { MenuBar, MenuButton } from './ui/menu-bar';
import { SidePanel } from './ui/side-panel';
import { TypeSelector } from './ui/type-selector';

class CartoCrow { 
	menu: MenuBar;

	maps: Map[] = [];

	constructor () {
		this.maps.push(new NecklaceMap());
		this.maps.push(new FlowMap());
		this.maps.push(new SimpleSets());
		this.loadMap(this.maps[0]);

		this.menu = new MenuBar();
		this.menu.$element.appendTo($('#header'));

		this.menu.add(new TypeSelector(this.maps, (map: Map) => {
			console.log('setting map type to ' + map.name);
		}));
		this.menu.addSeparator();
		this.menu.add(new MenuButton('Export', () => {
			console.log('Exporting...');
		}));
		this.menu.add(new MenuButton('Help', () => {
			console.log('Helping...');
		}));

		$('#overlay').on('click', (e: JQuery.ClickEvent) => {
			if (e.target === e.currentTarget) {
				$('#overlay').removeClass('shown');
			}
		});
	}

	loadMap(map: Map) {
		$('#side-panel-container').empty();
		$('#side-panel-container').append(map.sidePanel.$element);
	}
};

$(() => {
	new CartoCrow();
});
