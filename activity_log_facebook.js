var i = 0;
var max = 1000;
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

function toHTML() {
    var html = `
    <input style="width: 30%; padding:5px; border-radius: 10px;" type="text" id="text_search" placeholder="search...." onkeydown="search()"/>
    <span>Tổng: ${arr.length} bình luận</span>
    ${arr.map(item => `<div style='padding: 5px'> ${item} </div>`).join('\n')}
    <script>
        function change_alias(alias) {
            let str = alias;
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/ + /g, " ");
            str = str.trim();
            return str;
        }
        function search(){
            var all = document.getElementsByTagName("div");
            var text_search = document.getElementById("text_search").value.toLowerCase() ;
            for(var i=0; i<all.length; i++){
                if(all[i].innerHTML.toLowerCase().includes(text_search) || change_alias(all[i].innerHTML.toLowerCase()).includes(change_alias(text_search))){
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
var list = [];
var clicked = {};
function main() {
    setTimeout(() => {
        div = document.getElementsByClassName("_52ja _52jh _xtx");
        window.scroll({
            top: 999999999999999,
            left: 100,
            behavior: 'smooth'
        });
        i = 0;
        while (i < div.length && clicked[div[i].innerText] == 1) {
            i++;
        }
        if (i < div.length && list.length <= max) {
            console.log(div[i].innerText)
            clicked[div[i].innerText] = 1;
            if (i > 0) { div[i - 1].scrollIntoView(); }
            div[i].scrollIntoView();
            div[i].click();
            div[i].scrollIntoView();
            i++;
            list = document.getElementsByClassName("_56d4");
            console.log(list.length)
        }
        else {
            list = document.getElementsByClassName("_56d4");
            console.log(list.length)
            for (var j = 0; j < list.length; j++) {
                if (list[j].innerText.trim() != '') {
                    arr.push(list[j].innerText);
                }
            }
            download(`${getId()}.html`, toHTML());
            return;
        }
        main();
    }, 1500);
}
main();
