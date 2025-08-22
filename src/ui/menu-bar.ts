import './menu-bar.less';

export class MenuButton {
	$element: JQuery;
	
	constructor(label: string, onClick?: () => void) {
		this.$element = $('<div/>').addClass('menu-button')
			.text(label);

		if (onClick) {
			this.$element.on('click', () => { onClick() });
		}
	}

	onClick(onClick: () => void) {
		this.$element.on('click', () => { onClick() });
	}
}

export class MenuBar {
	$element: JQuery;

	constructor() {
		this.$element = $('<div/>').addClass('menu-bar');
	}

	add(button: MenuButton): void {
		this.$element.append(button.$element);
	}

	addSeparator(): JQuery {
		return $('<div/>').addClass('separator')
			.appendTo(this.$element);
	}

	clear(): void {
		this.$element.empty();
	}
}
