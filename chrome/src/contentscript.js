(function (document, window) {
	'use strict';

	function YourTube () {

	}

	/**
	 * Searches for banners.
	 */
	YourTube.prototype.searchForBanners = function () {
		var banners = [];
		banners.push(document.getElementById('header'));
		banners.push(document.getElementById('watch7-sidebar-ads'));
		banners.push(document.querySelector('#player-api .video-ads'));

		banners.push(document.getElementById('masthead-ad'));
		banners.push(document.querySelector('.video-ads'));
		banners.push(document.getElementById('player-ads'));
		return banners;
	};

	/**
	 * Removes banners.
	 * @param {Array<Element>} banners
	 */
	YourTube.prototype.removeBanners = function (banners) {
		var count = 0;
		for (var i = 0, len = banners.length; i < len; i++) {
			if (!banners[i]) {
				continue;
			}
			count++;
			banners[i].parentNode.removeChild(banners[i]);
		}

		if (count > 0) {
			console.log(
				'%cYourTube extension removed %d banners',
				'color: #cc181e', count
			);
		}
	};

	var yourTube = new YourTube(),
		lastHref = '';

	function clear () {
		if (lastHref === window.location.href) {
			setTimeout(clear, 3000);
			return;
		}
		lastHref = window.location.href;
		yourTube.removeBanners(yourTube.searchForBanners());
		setTimeout(clear, 1000);
	}

	console.log(
		'%cYourTube extension is activated for this website',
		'color: #cc181e'
	);

	clear();

})(document, window);