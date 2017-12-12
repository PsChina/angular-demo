function rem(value){
	
	document.documentElement.style.fontSize = window.screen.width/value + 'px';
	window.onresize = function() {
		document.documentElement.style.fontSize = window.screen.width/value + 'px';	
	}
}

module.exports = rem;

