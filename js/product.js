window.onload = function() {

  let click_cnt = 0;

  let now_item = get_cookie('now');
  let item = get_cookie(now_item).split('/');
  let name = item[0];
  let price = item[1];
  let summary = item[2];
  let info = item[3];
  let color = item[4].split(',');
  let size = item[5].split(',');
  

  let product_name = document.querySelector('.product-name');
  let product_price = document.querySelector('.product-price');
  let product_summary = document.querySelector('.product-summary');
  let product_info = document.querySelector('.product-info');
  let product_size = document.querySelector('.product-size');
  let product_color = document.querySelector('.product-color');

  product_name.innerHTML = name;
  product_price.innerHTML = price;
  product_summary.innerHTML = summary;
  product_info.innerHTML = info;

  create_box(size, "size");
  create_box(color, "color");

  product_size.addEventListener("click",function(e){
    active_click(e, this, "size");
    
    for(let i=0; i<product_color.childElementCount; i++) {
      product_color.children[i].classList.remove("disable");
    }
    product_color.addEventListener("click", function(e) {
      active_click(e, this, "color");

      /* 이곳에 코딩 진행하세요 */
    })
  });

}

function create_box(cnt, name) {
  
  for(let i=0; i<cnt.length; i++) {
    let box = document.querySelector('.product-' + name);
    let div = document.createElement('div');
    if(name == "color") {
      div.className = "product-box disable";
    }else {
      div.className = "product-box";
    }
    div.innerHTML = cnt[i];

    box.appendChild(div);
  }
}

function siblings(t) {
  var children = t.parentElement.children;
  var tempArr = [];

  for (var i = 0; i < children.length; i++) {
    tempArr.push(children[i]);
  }

  return tempArr.filter(function(e){
    return e != t;
  });
}






function active_click(e, it, name) {
  e.target.classList.add('active');
    
  for(let i=0; i<siblings(e.target).length; i++) {
    siblings(e.target)[i].classList.remove('active');
  }
  
  it.classList = "product-" + name;
  siblings(it)[0].classList = "";
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