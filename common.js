

// let search_btn = document.querySelector(".search-btn");
// let search_input = document.querySelector(".search-input");
// search_btn.addEventListener("click", function() {
//   location.href= 'html/search.html';


// })




// function search_cookie(cnt, name, price, summary, info, color, size, img) {
//   document.cookie = cnt + "=" +name + '|' + price + '|' + summary + '|' + info + '|' + color + '|' + size+ '|' + img;
// }

var items = [];
jsonArr(items);
autocomplete(document.querySelector(".search-input"), items);



function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function(e) {
      var list, text, val = this.value;
      
      if (!val) { return false;}
      currentFocus = -1;
      list = document.createElement("DIV");
      list.setAttribute("id", "autocomplete-list");
      list.setAttribute("class", "autocomplete-items");

      this.parentNode.appendChild(list);

      for (let i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          text = document.createElement("DIV");
          text.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          text.innerHTML += arr[i].substr(val.length);
          text.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

          text.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
          });
          list.appendChild(text);
        }
      }
  });
  
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
      } else if (e.keyCode == 38) { //up
        currentFocus--;
        addActive(x);
      } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (x) x[currentFocus].click();
        }
      }
  });
  
  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    x[currentFocus].classList.add("autocomplete-active");
  }
  
  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  
  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}



function jsonArr(item) {
  var xmlhttp = new XMLHttpRequest();
  var url = "/data.json";

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      addArr(item, JSON.parse(xmlhttp.responseText));
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function addArr(item, data) {
    for(let i=0; i<data.length; i++) {
      for(let k=0; k<data[i].items.length; k++) {
        item.push(data[i].items[k].name);
      }
    }
  }
}