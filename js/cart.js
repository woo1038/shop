window.onload = function() {

  var oldItems = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(oldItems.map(e => e));
  create_box(1);
}

function create_box(cnt) {
  let table = document.querySelector(".list-table tbody");
  let table_tr = document.createElement("tr");
  
  table_tr.setAttribute("id", "cart-" + cnt);
  table_tr.className = "list-item"
  table.appendChild(table_tr);

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
        img.setAttribute("src", "http://lookple.com/web/product/tiny/20200501/623f9ebb2f116d41a4902a96ee78c885.jpg");
        div.appendChild(img);
        num += 1;
        break;

      case 3:
        table_td.className = "cart-info";
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        a.setAttribute("href", "#none");
        div.appendChild(a);
        div.appendChild(p);
        p.innerHTML = "[옵션: "
        // ###################################
        p.appendChild(span);
        num += 1;
        break;

      case 4:
        table_td.className = "cart-price";
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        div.innerHTML = "34000"
        // ###################################
        num += 1;
        break;

      case 5:
        table_tr.appendChild(table_td);
        table_td.className = "cart-count";
        div.className = "count-div";
        table_td.appendChild(div);
        input.setAttribute("onkeyup", "enterkey(this)");
        input.setAttribute("onblur", "price(" + cnt + ")");
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
        div.innerHTML = "30원"
        // ###################################
        num += 1;
        break;

      case 7:
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        div.innerHTML = "기본배송"
        // ###################################
        num += 1;
        break;

      case 8:
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        div.innerHTML = "무료"
        // ###################################
        num += 1;
        break;

      case 9:
        table_tr.appendChild(table_td);
        table_td.appendChild(div);
        div.innerHTML = "34000"
        // ###################################
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
  console.log(table);
}