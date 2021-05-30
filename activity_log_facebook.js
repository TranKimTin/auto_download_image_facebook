var maxYear = 2020;
var maxMonth = 1;
var arr = [];
var list = [];

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

function getTag(month, year, more) {
    let id = '';
    if (month == 12 && more == 0) {
        id = `year_${year}`
    } else if (more == 0) {
        id = `month_${year}_${month}`;
    }
    else if (more > 0) {
        id = `month_${year}_${month}_more_${more}`
    }
    let tag = document.getElementById(id);
    if (tag != null) {
        tag.scrollIntoView();
    }
    return tag;
}

function click(month, year, more) {
    return new Promise((resolve, reject) => {
        let tag = getTag(month, year, more);
        console.log(`thang ${month}, nam ${year}, trang ${more}`);
        if (tag == null) return resolve(0);
        tag.click();
        if (tag.firstChild != null) {
            tag.firstChild.click();
        }
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
}

async function clickFullMonth(month, year) {
    let i = 0;
    while (true) {
        await click(month, year, i);
        if (getTag(month, year, i) == null && getTag(month, year, i + 1) == null) return;
        if (i > 0 && getTag(month, year, i) != null) continue;
        i++;
    }
}

async function getData() {
    let year = new Date().getFullYear();
    for (let i = year; i >= maxYear; i--) {
        for (let j = 12; j >= 1; j--) {
            if (i < maxYear) return;
            if (i == maxYear && j < maxMonth) return;
            await clickFullMonth(j, i);
        }
    }
}

async function main() {
    await getData();

    list = document.getElementsByClassName("_56d4");
    for (var j = 0; j < list.length; j++) {
        if (list[j].innerText.trim() != '') {
            arr.push(list[j].innerText);
        }
    }
    download(`${getId()}.html`, toHTML());
}
main();
