import 'bootstrap';
import './style.scss';
import sdgwheel from './images/sdgwheelnumbers.png';
import sdg1 from './images/E_SDG goals_icons-individual-rgb-01.png';
import sdg2 from './images/E_SDG goals_icons-individual-rgb-02.png';
import sdg3 from './images/E_SDG goals_icons-individual-rgb-03.png';
import sdg4 from './images/E_SDG goals_icons-individual-rgb-04.png';
import sdg5 from './images/E_SDG goals_icons-individual-rgb-05.png';
import sdg6 from './images/E_SDG goals_icons-individual-rgb-06.png';
import sdg7 from './images/E_SDG goals_icons-individual-rgb-07.png';
import sdg8 from './images/E_SDG goals_icons-individual-rgb-08.png';
import sdg9 from './images/E_SDG goals_icons-individual-rgb-09.png';
import sdg10 from './images/E_SDG goals_icons-individual-rgb-10.png';
import sdg11 from './images/E_SDG goals_icons-individual-rgb-11.png';
import sdg12 from './images/E_SDG goals_icons-individual-rgb-12.png';
import sdg13 from './images/E_SDG goals_icons-individual-rgb-13.png';
import sdg14 from './images/E_SDG goals_icons-individual-rgb-14.png';
import sdg15 from './images/E_SDG goals_icons-individual-rgb-15.png';
import sdg16 from './images/E_SDG goals_icons-individual-rgb-16.png';
import sdg17 from './images/E_SDG goals_icons-individual-rgb-17.png';
import sdg18 from './images/E_SDG_logo_with_UN_Emblem_square_rgb.png';
var sdgwheelImg = document.getElementById('sdgwheel');
sdgwheelImg.src = sdgwheel;
var sdgwheelImg2 = document.getElementById('sdgwheel2');
sdgwheelImg2.src = sdgwheel;
document.getElementById('sdg1').src = sdg1;
document.getElementById('sdg2').src = sdg2;
document.getElementById('sdg3').src = sdg3;
document.getElementById('sdg4').src = sdg4;
document.getElementById('sdg5').src = sdg5;
document.getElementById('sdg6').src = sdg6;
document.getElementById('sdg7').src = sdg7;
document.getElementById('sdg8').src = sdg8;
document.getElementById('sdg9').src = sdg9;
document.getElementById('sdg10').src = sdg10;
document.getElementById('sdg11').src = sdg11;
document.getElementById('sdg12').src = sdg12;
document.getElementById('sdg13').src = sdg13;
document.getElementById('sdg14').src = sdg14;
document.getElementById('sdg15').src = sdg15;
document.getElementById('sdg16').src = sdg16;
document.getElementById('sdg17').src = sdg17;
document.getElementById('sdg18').src = sdg18;
document.getElementById('emblem').src = sdg18;
var $ = require('jquery');
window.onload = function () {
	// sdgwheelImg.className = 'rotate';
	$('#mainsdgbox1').show();
	var goal = Math.floor(Math.random() * Math.floor(18)) + 1;
	window.clickBox(goal);
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
window.clickBox = function (goalnum) {
	$('.sdgbox').hide();
	$('#mainsdgbox' + goalnum).show();
	$('#sdgwheel').addClass('maroma');
	setTimeout(function () {
		$('#sdgwheel').removeClass('maroma');
	}, 1001);
	$('#sdgwheel2').addClass('maroma');
	setTimeout(function () {
		$('#sdgwheel2').removeClass('maroma');
	}, 1001);
}
