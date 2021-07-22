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

  
  
  const hover_barrier = document.querySelectorAll(".hover-barrier");
  for(const hover of hover_barrier) {
    let name = hover.parentNode.parentNode.getAttribute("name");
    let price = hover.parentNode.parentNode.getAttribute("price");
    let summary = hover.parentNode.parentNode.getAttribute("summary");
    let info = hover.parentNode.parentNode.getAttribute("info");
    let color = hover.parentNode.parentNode.getAttribute("color");
    let arr = [name, price, summary, info, color];
    
    let cnt = 0
    let color_box = document.createElement("div");

    arr.forEach((text) => {
      cnt += 1

      let span = document.createElement("span");

      if(cnt == 5) {
        let color_block = text.split(' ');
        color_block.map((e) => {
          let block = document.createElement("span");
          block.className = e
          color_box.className = "color-box";
          color_box.appendChild(block)
          hover.appendChild(color_box)
        });
      } else {
        span.innerHTML = text
        hover.appendChild(span)
      }
    })
  }


  /* banner items array layout */
  let banner_arr = []
  let best_items = document.querySelectorAll(".best-item");
  let banner_item = document.querySelector(".banner-item");
  
  for(let i=0; i<best_items.length; i++) {
    let cnt = 0;  //상품별로 1,2,3 순서대로 배열 하기 위한 변수

    for(let k=0; k<best_items.length; k++) {
      cnt++;
      if (banner_arr.length >= 9) {
        break;
      }
      banner_arr.splice(k+cnt, 0, best_items[k].children[i]);
    }
  }

  Array.from(banner_arr).map(item => {
    /* item */
    let item_class = item.classList[0];
    let item_onclick = item.getAttribute("onclick");
    let item_name = item.getAttribute("name");
    let item_price = item.getAttribute("price");
    let item_summary = item.getAttribute("summary");
    let item_info = item.getAttribute("info");
    let item_color = item.getAttribute("color");
    let item_size = item.getAttribute("size");
    let item_img = item.children[0].children[1].src;
    
    /* create */
    let li = document.createElement("li");
    let img = document.createElement("img");
    let div_item = document.createElement("div");

    /* setAttr */
    li.className = item_class;
    li.setAttribute("onclick", item_onclick);
    li.setAttribute("name", item_name);
    li.setAttribute("price", item_price);
    li.setAttribute("summary", item_summary);
    li.setAttribute("info", item_info);
    li.setAttribute("color", item_color);
    li.setAttribute("size", item_size);

    /* latout */
    for(let i=0; i<2; i++) {
      let div = document.createElement("div");

      switch (i) {
        case 0:
          div.className ="banner-img";
            li.appendChild(div);
            img.src = item_img;
            div.appendChild(img);
          break;
        case 1:
            for(let k=0; k<=4; k++) {
              let label = document.createElement("label");

              switch (k) {
                case 0:
                    label.innerHTML = item_name;
                  break;
                  
                case 1:
                    label.innerHTML = item_price;
                  break;
                  
                case 2:
                    label.innerHTML = item_summary;
                  break;
                  
                case 3:
                    label.innerHTML = item_info;
                  break;
                  
                case 4:
                    div_item.className = "color-box"
                    div.appendChild(div_item); 
    
                    for(let j=0; j<item_color.split(" ").length; j++) {
                      let span = document.createElement("span");
                      span.className = item_color.split(" ")[j];
                      div_item.appendChild(span);
                    }
                  break;
              }
              div.className = "banner-info"
              div.appendChild(label);
            }
            li.appendChild(div);
          break;
      }
    }
    banner_item.appendChild(li);
  });
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