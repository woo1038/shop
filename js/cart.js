window.onload = function() {
  let cnt = 0

  let cart_item = JSON.parse(localStorage.getItem('cart'));
  for(let i=0; i<cart_item.length; i++) {
    for(let k=0; k<cart_item[i].option.length; k++) {
      cnt += 1
      create_box(cnt, cart_item[i].name, cart_item[i].option[k]);
    }
  }

  total_price_all();
}

/* ######################### create layout ######################### */
function create_box(cnt, name, option) {
  let table = document.querySelector(".list-table tbody");
  let table_tr = document.createElement("tr");
  
  table_tr.setAttribute("id", "cart-" + cnt);
  table_tr.className = "list-item"
  table_tr.classList.add(name);
  table.appendChild(table_tr);

  /* get cookie item */
  let get_item = get_cookie(name).split('|');
  let get_name = get_item[0];
  let get_price = get_item[1];
  let get_img = get_item[6];

  /* option */
  let option_size = option.split(',')[0];
  let option_color = option.split(',')[1];
  let option_count = option.split(',')[2];


  let num = 1;
  let flag = true;
  while (flag) {
    
    let table_td = document.createElement("td");
    let div = document.createElement("div");
    let ul = document.createElement("ul");
    let input = document.createElement("input");
    let img = document.createElement("img");
    let a = document.createElement("a");
    let p = document.createElement("p");
    let span = document.createElement("span");

    switch (num) {
      case 1:
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        input.setAttribute("type", "checkbox")
        input.setAttribute("name", "check")
        input.setAttribute("type", "checkbox")
        div.appendChild(input);
        num += 1;
        break;

      case 2:
        table_td.className = "cart-img";
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        img.setAttribute("src", get_img);
        div.appendChild(img);
        num += 1;
        break;

      case 3:
        table_td.className = "cart-info";
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        a.innerHTML = get_name;
        a.setAttribute("onclick", "product('" + name +"')");
        a.setAttribute("href", "#none");
        div.appendChild(a);
        div.appendChild(p);
        p.innerHTML = "[옵션: "
        span.innerHTML = option_size.concat(",", option_color) + "]";
        p.appendChild(span);
        num += 1;
        break;

      case 4:
        table_td.className = "cart-price";
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        div.innerHTML = parseInt(get_price).toLocaleString('ko-KR') + "원";
        num += 1;
        break;

      case 5:
        table_tr.appendChild(table_td);
        table_td.className = "cart-count";
        div.className = "count-div";
        table_td.appendChild(div);
        input.setAttribute("onkeyup", "enterkey(this)");
        input.setAttribute("onblur", "price(" + cnt + ")");
        input.value = option_count;
        div.appendChild(input);
        for(let i=0; i<2; i++) {
          let btn = document.createElement("button");
          let btn_a = document.createElement("a");
          if(i == 0) {
            btn.className = "up-btn"
            btn.setAttribute("onclick", "upclick(" + cnt + ")");
            div.appendChild(btn);
            btn_a.href = "#none";
            btn_a.innerHTML = "▲"
            btn.appendChild(btn_a);
          } else {
            btn.className = "down-btn"
            btn.setAttribute("onclick", "downclick(" + cnt + ")");
            div.appendChild(btn);
            btn_a.href = "#none";
            btn_a.innerHTML = "▼"
            btn.appendChild(btn_a);
          }
          div.appendChild(btn);
        }

        num += 1;
        break;

      case 6:
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        div.innerHTML = parseInt((option_count * get_price) * 0.001) + "원";
        num += 1;
        break;

      case 7:
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        div.innerHTML = "기본배송"
        num += 1;
        break;

      case 8:
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        if(option_count * get_price >= 30000) {
          div.innerHTML = "무료"
        } else {
          div.innerHTML = "2500"
        }
        num += 1;
        break;

      case 9:
        table_tr.appendChild(table_td);
        div.classList.add("cart-item");
        table_td.appendChild(div);
        div.innerHTML = parseInt(option_count * get_price).toLocaleString('ko-KR') + "원";
        num += 1;
        break;

      case 10:
        ul.className = "item-btn";
        table_td.appendChild(ul);
        for(let i=0; i<3; i++) {
          let li = document.createElement("li");
          if(i == 0) {
            li.innerHTML = "주문하기"
          } else if(i == 1) {
            li.innerHTML = "관심상품등록"
          } else if(i == 2) {
            li.setAttribute("onclick", "remove(" + cnt + ")");
            li.innerHTML = "삭제"
          }
          ul.appendChild(li);
        }
        table_tr.appendChild(table_td);
        num += 1;
        flag = false;
        break;
    }
  }
}


/* ######################### click function ######################### */
function upclick(cnt) {
  let item = document.getElementById("cart-" + cnt);
  let input = item.children[4].children[0].children[0];
  let label_price = item.children[8].children[0];
  let product_price = item.children[3].children[0];

  /* local */
  let cart_item = JSON.parse(localStorage.getItem('cart'));
  let cart_class = item.classList[1];
  let cart_option = item.children[2].children[0].children[1].children[0].innerHTML.split("]")[0];
  let cart_count = input.value;
  let cart_compare = cart_option.concat(",", cart_count);

  for(let i=0; i<cart_item.length; i++) {
    if(cart_item[i].name == cart_class) {
      for(let k=0; k<cart_item[i].option.length; k++) {
        if(cart_item[i].option[k] == cart_compare) {
          cart_item[i].option[k] = cart_option.concat(",",parseInt(input.value) + 1);
        }
      }
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart_item));
  


  input.value++;
  label_price.innerHTML = parseInt(input.value * (product_price.innerHTML.replace(/원/g, "", ).replace(/,/g, ""))).toLocaleString('ko-KR') + "원";
  total_price_all();
}

function downclick(cnt) {
  let item = document.getElementById("cart-" + cnt);
  let input = item.children[4].children[0].children[0];
  let label_price = item.children[8].children[0];
  let product_price = item.children[3].children[0];

  /* local */
  let cart_item = JSON.parse(localStorage.getItem('cart'));
  let cart_class = item.classList[1];
  let cart_option = item.children[2].children[0].children[1].children[0].innerHTML.split("]")[0];
  let cart_count = input.value;
  let cart_compare = cart_option.concat(",", cart_count);
  
  if (input.value > 1) {

    for(let i=0; i<cart_item.length; i++) {
      if(cart_item[i].name == cart_class) {
        for(let k=0; k<cart_item[i].option.length; k++) {
          if(cart_item[i].option[k] == cart_compare) {
            cart_item[i].option[k] = cart_option.concat(",",parseInt(input.value) - 1);
          }
        }
      }
    }

    localStorage.setItem('cart', JSON.stringify(cart_item));
    input.value--;
    label_price.innerHTML = parseInt(input.value * (product_price.innerHTML.replace(/원/g, "", ).replace(/,/g, ""))).toLocaleString('ko-KR') + "원";
    total_price_all();
  }
}

function remove(cnt) {
  local_checking(cnt);

  let item = document.getElementById("cart-" + cnt);
  item.remove();

  total_price_all();
}


function product(cnt) {
  let item = document.querySelector('.' + cnt);
  var xmlhttp = new XMLHttpRequest();
  var url = "/data.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      set_item(xmlhttp.responseText, item);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function set_item(data, item) {
    let info_arr;
    var arr = JSON.parse(data);
    console.log(arr);
    for(let i=0; i<arr.length; i++) {
      for(let k=0; k<arr[i].items.length; k++) {
        if(arr[i].items[k].class == item.classList[1]) {
          info_arr = arr[i].items[k];
        }
      }
    } 
    let name = info_arr.name;
    let price = info_arr.price;
    let summary = info_arr.summary;
    let info = info_arr.info;
    let color = info_arr.color.join(" ");
    let size = info_arr.size.join(" ");
    let img = info_arr.img;

    set_cookie(cnt, name, price, summary, info, color, size, img);
  }
  
  now_cookie("now", cnt);
  location.href= '/html/product.html';
}


/* ######################### checking ######################### */
function total_price_all() {
  let item = document.querySelectorAll('.cart-item');
  let total_price = document.querySelector('.total-price');
  let total_delivery = document.querySelector('.total-delivery');
  let total_hap = document.querySelector('.total-hap');
  let total = 0;

  
  for(let i=0; i<item.length; i++) {
    total += parseInt(item[i].innerHTML.replace(/,/g, ""));
  }
  total_price.innerHTML = parseInt(total).toLocaleString('ko-KR');
  
  if(total >= 30000) {
    total_delivery.innerHTML = 0
  } else {
    total_delivery.innerHTML = parseInt(2500).toLocaleString('ko-KR');
  }
  
  total_hap.innerHTML = parseInt(parseInt(total) + parseInt(total_delivery.innerHTML.replace(/,/g, ""))).toLocaleString('ko-KR');
  
  for(const i of item) {
    let price = parseInt(i.innerHTML.replace(/,/g, ""));
    let accoum = i.parentNode.parentNode.children[5];
    let delivery = i.parentNode.parentNode.children[7].childNodes[0];
    
    accoum.innerHTML = parseInt(price * 0.001).toLocaleString('ko-KR') + "원";

    if(price >= 30000) {
      delivery.innerHTML = "무료"
    } else {
      delivery.innerHTML = "2,500원"
    }
  }

}

/* ######################### onblur ######################### */
function price(cnt) {
  let item = document.getElementById("cart-" + cnt);
  let input = item.children[4].children[0].children[0].value;
  let label_price = item.children[5];
  let product_price = item.children[3].children[0];
  let total_price = item.children[8].children[0]

  /* local */
  let cart_item = JSON.parse(localStorage.getItem('cart'));
  let cart_class = item.classList[1];
  let cart_option = item.children[2].children[0].children[1].children[0].innerHTML.split("]")[0];
  let cart_count = input;
  let cart_compare = cart_option.concat(",", cart_count);

  for(let i=0; i<cart_item.length; i++) {
    if(cart_item[i].name == cart_class) {
      for(let k=0; k<cart_item[i].option.length; k++) {
        let this_option = cart_item[i].option[k].split(',')[0].concat(",", cart_item[i].option[k].split(',')[1])
        console.log(this_option, cart_compare);
        if(this_option == cart_option) {
          cart_item[i].option[k] = cart_option.concat(",",parseInt(input));
        }
      }
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart_item));
    

  label_price.innerHTML = parseInt(input * (product_price.innerHTML.replace(/원/g, "", ).replace(/,/g, "")) * 0.001).toLocaleString('ko-KR') + "원";
  total_price.innerHTML = parseInt(input * (product_price.innerHTML.replace(/원/g, "", ).replace(/,/g, ""))).toLocaleString('ko-KR') + "원";
  total_price_all();
}

/* ######################### key press ######################### */
function enterkey(e) {
  if (window.event.keyCode == 13) {
    e.blur();
  }
}

/* ######################### cookie ######################### */
function local_checking(cnt) {
  let item = document.getElementById("cart-" + cnt);

  let item_class = item.classList[1];

  let option = item.children[2].children[0].children[1].children[0].innerHTML.split(']')[0];
  let count = item.children[4].children[0].children[0].value;
  let option_concat = option.concat(",", count);

  let cart_item = JSON.parse(localStorage.getItem('cart'));
  
  for(let i=0; i<cart_item.length; i++) {
    if(cart_item[i].name == item_class) {
      for(let k=0; k<cart_item[i].option.length; k++) {
        if(cart_item[i].option[k] == option_concat) {
          cart_item[i].option.splice(k, 1);
        }
      }
    }
  }
  localStorage.setItem('cart', JSON.stringify(cart_item));
}




/* ######################### set cookie ######################### */
function now_cookie(name, value) {
  document.cookie = name + "=" + value + ";Path=/html/product.html;"
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




