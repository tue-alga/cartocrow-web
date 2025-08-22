import './type-selector.less';

import { Map } from '../map';
import { MenuButton } from './menu-bar';

export class TypeSelector extends MenuButton {

	onMapSelected: (map: Map) => void;

	constructor(maps: Map[], activeMap: Map, onMapSelected: (map: Map) => void) {
		super(activeMap.name);
		this.$element.addClass('type-selector');
		this.onMapSelected = onMapSelected;

		this.onClick(() => {
			let $flyout = this.createFlyout(maps, activeMap);
			let $overlay = $('#overlay');
			$overlay.empty();
			let $buttonCopy = this.$element.clone()
				.on('click', () => {
					$overlay.removeClass('shown');
				});
			$overlay.append($buttonCopy);
			$buttonCopy.append($flyout);
			$overlay.addClass('shown');
		});
	}

	createFlyout(maps: Map[], activeMap: Map): JQuery {
		let $flyout = $('<div/>').addClass('flyout');

		let $mapList = $('<div/>').addClass('map-list').appendTo($flyout);
		let $mapDetails = $('<div/>').addClass('map-details').appendTo($flyout);
		let $mapDescription = $('<div/>').addClass('map-description')
			.appendTo($mapDetails);

		for (let map of maps) {
			let $mapItem = $('<div/>').addClass('map-item')
				.text(map.name)
				.appendTo($mapList);
			if (map == activeMap) {
				$mapItem.addClass('active');
				$mapDescription.html(map.description);
			}
			$mapItem.on('mouseover', () => {
				$('.map-item').removeClass('active');
				$mapItem.addClass('active');
				$mapDescription.html(map.description);
			});
			$mapItem.on('click', () => {
				this.onMapSelected(map);
				$('#overlay').removeClass('shown');
			});
		}

		return $flyout;
	}
}
