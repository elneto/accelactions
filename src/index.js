import 'bootstrap';
import './style.scss';

var $ = require('jquery');
window.onload = function () {
	// sdgwheelImg.className = 'rotate';
	$('#mainsdgbox1').show();
	resizeScrollYoo();
};
// console.log($);
window.showHideAccount = function () {
	$('#accountbox').slideToggle();
	return false;
}
// Wait until the DOM has loaded before querying the document
$(document).ready(function () {
	$.post('//sustainabledevelopment.un.org/showUserMenu2.php', function (result) {
		$('#accountbox').html(result);
	});
});
function resizeScrollYoo () {
	if ($('body').scrollTop() > 35) {
		sdgkplogo.className = 'sdgkplogo_small';
	} else {
		if ($(window).width() > 576) {
			sdgkplogo.className = 'sdgkplogo_normal';
		}
	}
}
var sdgkplogo = document.getElementById('sdgkplogo');
$(document).scroll(function () {
	resizeScrollYoo();
});
// var columnof2 = document.getElementById('columnof2');
$(window).resize(function () {
	if ($(window).width() < 576) {
		sdgkplogo.className = 'sdgkplogo_small';
		// columnof2.className = 'noypadding';
	} else {
		sdgkplogo.className = 'sdgkplogo_normal';
	}
});
