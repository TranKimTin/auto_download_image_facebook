var max = 100; //số lượng ảnh muốn tải
var i=5;

function forceDownload(url){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        let tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = 'image';
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}

function main(){
    setTimeout(() => {
        let all = document.getElementsByTagName("img");
        if(i<all.length){
            forceDownload(all[i].src);
            //console.log(all[i].src);
            i++;
            // break;
        }
        if(i >= max + 5) {
            console.log('done');
            return;
        }
        if(i >= all.length){
            window.scroll({
                top: 999999999999999,
                left: 100,
                behavior: 'smooth'
            });
        }
        main();
    }, 150);
}
main();
