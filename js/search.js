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
    var arr = JSON.parse(data);
    var layout_li = "";
    let cnt = 0
    let section = document.getElementById('items');

    while (cnt < arr.length) {
      let create_ul = document.createElement("ul");
      if (cnt == 0) create_ul.className = `best-item ${arr[cnt].content}-btn active`;
      else create_ul.className = `best-item ${arr[cnt].content}-btn`;
      section.appendChild(create_ul)
      
      for (let k=0; k<arr[cnt].items.length; k++) {
        layout_li+=
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
        if(k == arr[cnt].items.length - 1) {
          document.getElementById('items').children[cnt].innerHTML = layout_li;
          layout_li = ""
        }
      }

      cnt++;
    }
  }


}