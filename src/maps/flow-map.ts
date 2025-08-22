import { Map } from '../map';
import { SidePanel } from '../ui/side-panel';

export class FlowMap implements Map {
	name: string;
	description: string;
	sidePanel: SidePanel;

	constructor() {
		this.name = 'Flow Maps';
		this.description = `<p>A type of thematic map depicting flows from a source to a number of destinations. The width of the flow drawn to each destination indicates the amount of flow.</p>`;

		this.sidePanel = new SidePanel('');
	}
}
