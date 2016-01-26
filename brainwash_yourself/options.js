defaultImage = chrome.extension.getURL('flower.jpg');

function restoreDefaultImage(imageUrls){
    if (!(imageUrls && imageUrls.length)){
      return [defaultImage];    
    }

    return imageUrls;
}

chrome.storage.local.get({
    imageUrls: [defaultImage]
}, function(items) {
    restoreDefaultImage(items.imageUrls).forEach(setImage);
});

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        var span = document.createElement('span');
        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="Remove"/>'].join('');
        span.onclick = removePicture;
        document.getElementById('list').insertBefore(span, null);
        // it's bad for performance to call updateSettings() inside this loop, but the reader is async - handle this
        updateSettings();

      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

function removePicture(){
  this.parentNode.removeChild(this); 
  updateSettings(); 
}

function updateSettings(){
  allUrls = [];
  var pictures = document.getElementsByClassName('thumb');
  for (var i = 0; i < pictures.length; ++i) {
      var item = pictures[i];  
      console.log(item.src);
      allUrls.push(item.src);
  }

  // show default image if there are no images chosen
  if (!allUrls.length){
      allUrls = [defaultImage];
      setImage(defaultImage);
  }

  chrome.storage.local.set({imageUrls: allUrls});
}


document.getElementById('files').addEventListener('change', handleFileSelect, false);

function setImage(src){
  // Render thumbnail.
  var span = document.createElement('span');
  span.innerHTML = '<img class="thumb" src="' + src + '" title="Remove"/>';
  span.onclick = removePicture;
  document.getElementById('list').insertBefore(span, null);
}