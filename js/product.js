

window.onload = function() {

  let id_cnt = 0;
  let catch_count = 0;

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

  create_box(size, "size", 1);
  create_box(color, "color", 1);
  
  product_size.addEventListener("click",function(e){
    active_click(e, this, "size");
    set_cookie("option-1", e.target.innerHTML);

    for(let i=0; i<product_color.childElementCount; i++) {
      product_color.children[i].classList.remove("disable");
    }

    catch_count = 1;
  });


  product_color.addEventListener("click", function(e) {
    if(catch_count == 1) {
      active_click(e, this, "color");
      set_cookie("option-2", e.target.innerHTML);
  
      id_cnt++;
      create_box(id_cnt, item, 2);
    }

    /* total */
    // let total_price = document.querySelector('.total-price');
    // total_price.innerHTML = parseInt(total_price.innerHTML).toLocaleString('ko-KR');
    total_price_all();


  })

}

/* ######################### create layout ######################### */
function create_box(cnt, name, key) {
  switch (key) {
    case 1:
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
      break;

    case 2:
          let items = document.querySelector('.product-items');
          
          let li = document.createElement("li");
          let div = document.createElement("div");
          let h5 = document.createElement("h5");
          let p = document.createElement("p");
          let span = document.createElement("span");
          let input = document.createElement("input");
          let label = document.createElement("label");
          let product_name = name[0];
          let product_price = name[1];

          /* arr join */
          let option_1 = get_cookie("option-1");
          let option_2 = get_cookie("option-2");
          let option_arr = [];
          option_arr.push(option_1);
          option_arr.push(option_2);
          option_arr.join('/')

          li.classList.add("product-item");
          li.id = "item-" + cnt;
          items.appendChild(li);

          h5.innerHTML = product_name;
          p.innerHTML = "- " + option_arr;
          div.appendChild(h5);
          div.appendChild(p);
          li.appendChild(div);

          input.setAttribute("onkeyup", "enterkey(this)");
          input.setAttribute("onblur", "price(" + cnt + ")");
          input.type = "text";
          input.value = 1;
          span.appendChild(input);

          for(let i=0; i<3; i++) {
            let button = document.createElement("button");
            let a = document.createElement("a");
            switch (i) {
              case 0:
                  button.classList.add("up-bth");
                  button.setAttribute("onclick", "upclick(" + cnt + ")");
                  a.href = "#none";
                  a.innerHTML = "▲";
                  button.append(a);
                  span.appendChild(button);
                  li.appendChild(span);
                break;
              case 1:
                  button.classList.add("down-bth");
                  button.setAttribute("onclick", "downclick(" + cnt + ")");
                  a.href = "#none";
                  a.innerHTML = "▼";
                  button.append(a);
                  span.appendChild(button);
                  li.appendChild(span);
                  break;
              case 2:
                  button.setAttribute("onclick", "remove(" + cnt + ")");
                  a.href = "#none";
                  a.innerHTML = "x";
                  button.appendChild(a);
                  li.appendChild(button);
                break;
            }
          }

          label.innerHTML = product_price;
          li.appendChild(label);
      break;
  }
  
}



/* ######################### sibling element select ######################### */
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



/* ######################### click function ######################### */
function active_click(e, it, name) {
  e.target.classList.add('active');
    
  for(let i=0; i<siblings(e.target).length; i++) {
    siblings(e.target)[i].classList.remove('active');
  }
  
  it.classList = "product-" + name;
  siblings(it)[0].classList = "";
}


function upclick(cnt) {
  let item = document.getElementById("item-" + cnt);
  let input = item.children[1].children[0];
  let label_price = item.children[3];
  let product_price = get_cookie(get_cookie('now').split('/')[0]).split('/')[1];

  input.value++;
  label_price.innerHTML = input.value * product_price;
  total_price_all();
}

function downclick(cnt) {
  let item = document.getElementById("item-" + cnt);
  let input = item.children[1].children[0];
  let label_price = item.children[3];
  let product_price = get_cookie(get_cookie('now').split('/')[0]).split('/')[1];

  if (input.value > 1) {
    input.value--;
    label_price.innerHTML = input.value * product_price;
    total_price_all();
  }
}

function remove(cnt) {
  let item = document.getElementById("item-" + cnt);
  item.remove();

  total_price_all();
}



/* ######################### onblur ######################### */
function price(cnt) {
  let item = document.getElementById("item-" + cnt);
  let input = item.children[1].children[0];
  let label_price = item.children[3];
  let product_price = get_cookie(get_cookie('now').split('/')[0]).split('/')[1];

  label_price.innerHTML = input.value * product_price;
  total_price_all();
}


/* ######################### key press ######################### */
function enterkey(e) {
  if (window.event.keyCode == 13) {
    e.blur();
  }
}

/* ######################### checking ######################### */
function total_price_all() {
  let item = document.querySelectorAll('.product-item');
  let total_price = document.querySelector('.total-price');
  let total = 0;

  
  for(let i=0; i<item.length; i++) {
    total += parseInt(item[i].children[3].innerHTML);
  }

  total_price.innerHTML = total;  
}



/* ######################### cookie ######################### */
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