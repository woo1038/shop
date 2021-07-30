window.onload = function() {
  var xmlhttp = new XMLHttpRequest();
  var url = "/data.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      create_layout(xmlhttp.responseText);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function create_layout(data) {
    let get_data = get_cookie("search");
    console.log(get_data);
    var arr = JSON.parse(data);
    console.log(arr);
    var layout_li = "";
    let cnt = 0
    let section = document.querySelector('.search-section');

    while (cnt < arr.length) {
      let create_ul = document.createElement("ul");
      if (cnt == 0) create_ul.className = `best-item ${arr[cnt].content}-btn active`;
      else create_ul.className = `best-item ${arr[cnt].content}-btn`;
      section.appendChild(create_ul)

      for (let k=0; k<arr[cnt].items.length; k++) {
        if(String(arr[cnt].items[k].name).includes(String(get_data))) {
          layout_li +=
          `<li 
            class="${arr[cnt].items[k].class}"
            onclick="product('${arr[cnt].items[k].class}')"
            name="${arr[cnt].items[k].name}"
            price="${arr[cnt].items[k].price}"
            summary="${arr[cnt].items[k].summary}"
            info="${arr[cnt].items[k].info}"
            color="${arr[cnt].items[k].color.join(" ")}"
            size="${arr[cnt].items[k].size.join(" ")}"
            >
              <div>
                <div class="hover-barrier"></div>
                <img src="${arr[cnt].items[k].img}" alt="이미지" />
              </div>
            </li>`

          section.children[cnt].innerHTML = layout_li;
        }
      }

      cnt++;
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