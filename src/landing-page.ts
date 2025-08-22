import './landing-page.less';

class LandingPage {
	constructor () {
		$('.gallery-tile').on('click', (e) => {
			const $target = $(e.target);
			$('.gallery-tile').removeClass('active');
			$target.addClass('active');
			$('.map-explanation').hide();
			const type = $target.attr('id')?.replace('-tile', '');
			$('#' + type + '-explanation').show();
		});
	}
};

$(() => {
	new LandingPage();
});
