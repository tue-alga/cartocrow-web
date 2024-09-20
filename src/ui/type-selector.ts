import './type-selector.less';

import { Map } from '../map';
import { MenuButton } from './menu-bar';

export class TypeSelector extends MenuButton {

	constructor(maps: Map[], onMapSelected: (map: Map) => void) {
		super(maps[0].name);
		this.$element.addClass('type-selector');

		this.onClick(() => {
			let $flyout = this.createFlyout(maps);
			let $overlay = $('#overlay');
			$overlay.empty();
			let $buttonCopy = this.$element.clone();
			$overlay.append($buttonCopy);
			$buttonCopy.append($flyout);
			$overlay.addClass('shown');
		});
	}

	createFlyout(maps: Map[]): JQuery {
		let $flyout = $('<div/>').addClass('flyout');

		let $mapList = $('<div/>').addClass('map-list').appendTo($flyout);
		let $mapDetails = $('<div/>').addClass('map-details').appendTo($flyout);
		let $mapDescription = $('<div/>').addClass('map-description')
			.appendTo($mapDetails);

		for (let map of maps) {
			let $mapItem = $('<div/>').addClass('map-item')
				.text(map.name)
				.appendTo($mapList);
			$mapItem.on('mouseover', () => {
				$mapDescription.html(map.description);
			});
		}

		return $flyout;
	}
}
