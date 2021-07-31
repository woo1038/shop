window.onload = function () {
  var xmlhttp = new XMLHttpRequest();
  var url = "/data.json";

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      create_layout(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();


  function create_layout(data) {
    let get_data = get_cookie("search");
    var arr = JSON.parse(data);
    let cnt = 0
    let section = document.querySelector('.search-section');
    let items = document.querySelector('.search-items');
    let a = []

    while (cnt < arr.length) {

      for (let k = 0; k < arr[cnt].items.length; k++) {
        if (String(arr[cnt].items[k].name).includes(String(get_data))) {
          let layout_li = document.createElement("li");
          layout_li.setAttribute("class", arr[cnt].items[k].class)
          layout_li.setAttribute("onclick", "product(" + arr[cnt].items[k].class + ")")
          layout_li.setAttribute("name", arr[cnt].items[k].name)
          layout_li.setAttribute("price", arr[cnt].items[k].price)
          layout_li.setAttribute("summary", arr[cnt].items[k].summary)
          layout_li.setAttribute("info", arr[cnt].items[k].info)
          layout_li.setAttribute("color", arr[cnt].items[k].color.join(" "))
          layout_li.setAttribute("size", arr[cnt].items[k].size.join(" "))
          layout_li.innerHTML =
            `
            <div class="banner-img">
              <img src="${arr[cnt].items[k].img}" alt="이미지" />
            </div>
            <div class="banner-info">
              <label>${arr[cnt].items[k].name}</label>
              <label>${arr[cnt].items[k].price}</label>
              <label>${arr[cnt].items[k].summary}</label>
              <label>${arr[cnt].items[k].info}</label>
              <div class="color-box"></div>
            </div>
          `
          for (let i = 0; i < arr[cnt].items[k].color.length; i++) {
            let layout_span = document.createElement("span");
            layout_span.className = `${arr[cnt].items[k].color[i]}`
            layout_li.children[1].children[4].appendChild(layout_span);
          }
          items.appendChild(layout_li);
        }
      }
      cnt++;
    }

    if (cnt > 0) {
      let title = document.querySelector(".sub-title").children[0];
      title.innerHTML = `찾은결과 : ${get_data}`
    } else {

    }
  }


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