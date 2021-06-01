export function request(url,method,param, callback, callback2, rh=true){
    var xhr = new XMLHttpRequest();
    xhr.open(method, 'http://localhost:8888'+url, true);
    if(rh&&(method=='POST' || method=='post') ) xhr.setRequestHeader("Content-Type", "application/json;charset=utf8");

    xhr.onload = function (e) {
        if (this.status == 200) {
            let res = JSON.parse(this.response).result
            if(res){
                callback(res);
            }else{
                callback2(res);
            }
        }
    };
    let paramObj = ''
    if(rh){
        paramObj = param?JSON.stringify(param):''
    }else{
        paramObj = param
    }
    xhr.send(paramObj);
}

//set cookie
export function setCookie(name, value) {
    if (!name || !value) return;
    var Days = 30;//
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString();
}

//get cookie
export function getCookie(name) {

    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return decodeURIComponent(arr[2]);
    return null;
}

//del cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() -  2000);
    var cval = '';
    document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}
