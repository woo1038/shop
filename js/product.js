window.onload = function() {
  let hello = document.querySelector('.a');
  hello.innerHTML = get_cookie("now");
}

function set_cookie(name, value) {
  document.cookie = name + "=" + value;
}

function get_cookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');
  
  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

function add_cookie() {

}

function remove_cookie() {

}