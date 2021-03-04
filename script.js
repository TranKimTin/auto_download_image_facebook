function forceDownload(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = 'image';
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

let i=5;
setInterval(() => {
    window.scroll({
        top: 999999999999999,
        left: 100,
        behavior: 'smooth'
    });
    let all = document.getElementsByTagName("img");
    while(i<all.length){
        forceDownload(all[i].src);
        console.log(all[i].src);
        i++;
        // break;
    }
}, 1000);