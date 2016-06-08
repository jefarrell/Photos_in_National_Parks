
var cont = document.getElementById('buttonContainer');
var dest = document.getElementById('explore');

function scrollTo(element, to, duration) {
	if (duration <= 0) return;
	var difference =  to - element.scrollTop;
	var perTick = difference / duration*10;

	setTimeout(function() {
		element.scrollTop = element.scrollTop + perTick;
		if (element.scrollTop === to) return;
		scrollTo(element, to, duration-10);
	}, 10);
}

cont.onclick = function() {
	scrollTo(document.body, dest.offsetTop, 700);
}
