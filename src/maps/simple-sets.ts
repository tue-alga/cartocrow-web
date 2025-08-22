import { Map } from "../map";
import { SidePanel } from '../ui/side-panel';

export class SimpleSets implements Map {
	name: string;
	description: string;
	sidePanel: SidePanel;

	constructor() {
		this.name = 'SimpleSets';
		this.description = `<p>A method to visualize sets of items of different classes on a map.</p>`;

		this.sidePanel = new SidePanel('');
	}
}
