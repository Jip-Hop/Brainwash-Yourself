var flashTimeout, element, imageUrl;

chrome.storage.local.get({
    imageUrls: []
}, function(items) {
	if(items.imageUrls.length){
    	imageUrl = items.imageUrls[Math.floor(Math.random()*items.imageUrls.length)];
    } else {
        imageUrl = chrome.extension.getURL('flower.jpg');
    }
    setup();    
});

function step() {

	chrome.storage.sync.get('state', function(data) {
		if(element.style.display === 'none' && data.state !== 'off'){
			element.style.display = 'block';
			window.requestAnimationFrame(step);			
		} else {
			element.style.display = 'none';
			flashTimeout = setTimeout(function(){
				window.requestAnimationFrame(step);
			}, 10000);					
		}
	});
}

function setup(){
	$( "body" ).append( "<div id='the-brainwash-image' style='z-index:999999;background-image:url(" + imageUrl + ");background-size:cover;position:fixed;pointer-events:none;height:100vh;width:100vw;top:0;margin:0;padding:0;border:0;opacity:1;'></div>" );
	element = document.getElementById("the-brainwash-image");
	window.requestAnimationFrame(step);	
}

function stop(){
	window.clearTimeout(flashTimeout);
	$( "body" ).remove("#the-brainwash-image");
}