import { Map } from '../map';
import { SidePanel } from '../ui/side-panel';

import sidePanelHtml from './necklace-map-panel.html';

export class NecklaceMap implements Map {
	name: string;
	description: string;
	sidePanel: SidePanel;

	constructor() {
		this.name = 'Necklace Maps';
		this.description = `<p>A type of symbol map where the symbols are displayed as beads on a necklace around the map itself.</p>
<p>Necklace maps are effective when displaying the beads on the regions themselves would lead to clutter.</p>`;

		this.sidePanel = new SidePanel(sidePanelHtml);
		this.sidePanel.$element.find('#base-map-field').on('change', this.updateVisibility.bind(this));
		this.updateVisibility();
	}

	updateVisibility(): void {
		this.sidePanel.$element.find('.block').hide();
		this.sidePanel.$element.find('#base-map-block').show();
		console.log(this.sidePanel.$element.find('.block').length);
		if (this.sidePanel.$element.find('#base-map-field').val() !== '') {
			this.sidePanel.$element.find('#data-block').show();
		}
	}
}
