import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap';
import './style.scss';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

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
