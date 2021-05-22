var i = 5;
var max = 100;
var arr = [];
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
function getId() {
    var match = document.cookie.match(new RegExp('(^| )' + 'c_user' + '=([^;]+)'));
    if (match) {
        return match[2];
    }
    else {
        return 'comment_' + new Date().getTime();
    }
}

function toHTML(){
    var html = `
    <input style="padding:5" type="text" id="text_search" placeholder="search...." onkeydown="search()"/>

    ${arr.map(item => `<div> ${item} </div>`).join('\n')}

    <script>
        function search(){
            var all = document.getElementsByTagName("div");
            var text_search = document.getElementById("text_search").value.toLowerCase() ;
            for(var i=0; i<all.length; i++){
                if(all[i].innerHTML.toLowerCase().includes(text_search)){
                    all[i].style.display = "block";
                }
                else{
                    all[i].style.display = "none";
                }
            }
        }   

    </script>
    `
    return html;
}

function main() {
    setTimeout(() => {
        window.scroll({
            top: 999999999999999,
            left: 100,
            behavior: 'smooth'
        });
        var all = document.getElementsByClassName("a8c37x1j ni8dbmo4 stjgntxs l9j0dhe7 ojkyduve");
        while (i < all.length) {
            arr.push(all[i].innerHTML);
            console.log(arr[i]);
            i++;
            // break;
        }
        if (arr.length > max) {
            download(`${getId()}.html`, toHTML());
            return;
        }
        main();
    }, 1000);

}
main();
