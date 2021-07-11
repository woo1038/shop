window.onload = function() {
  const best_btn = document.querySelectorAll(".best-btn");
  
  for(const button of best_btn) {
    button.addEventListener("click", function(e) {
      best_btn.forEach((e) => e.children[0].classList.remove("active"));
      e.target.classList.add("active");
      
      let tab_item = document.querySelector("." + e.target.getAttribute("button"));
      // console.log([...tab_item.parentElement.children].map(e=>e.classList.remove("active")));
      Array.from(tab_item.parentElement.children).map(e=>e.classList.remove("active"));
      tab_item.classList.add("active");

    })
  }
}


function product(cnt) {
  location.href= 'html/product.html';
  now_cookie("now", cnt);
  
  let item = document.querySelector('.' + cnt);
  let name = item.getAttribute("name");
  let price = item.getAttribute("price");
  let summary = item.getAttribute("summary");
  let info = item.getAttribute("info");
  let color = item.getAttribute("color").split(' ');
  let size = item.getAttribute("size").split(' ');

  set_cookie(cnt, name, price, summary, info, color, size);
  console.log(get_cookie(cnt));
}


function now_cookie(name, value) {
  document.cookie = name + "=" + value;
}
function set_cookie(cnt, name, price, summary, info, color, size) {
  document.cookie = cnt + "=" +name + '/' + price + '/' + summary + '/' + info + '/' + color + '/' + size;
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