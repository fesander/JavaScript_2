function Container() {
  this.id = 'container';
  this.className = 'container';

  this.render = function () {
      let div = document.createElement('div');
      div.id = this.id;
      div.className = this.className;

      return div;
  };

  this.remove = function () {
      document.getElementById(this.id).remove();
  }
}

function Menu(id, className, items) {
  Container.call(this);
  this.id = id;
  this.className = className;
  this.items = items;

  this.render = function () {
      let ul = document.createElement('ul');
      ul.className = this.className;
      ul.id = this.id;
      
      for (let item in items) {
        if (this.items[item] instanceof MenuItem || this.items[item] instanceof Submenu) {
              ul.appendChild(this.items[item].render());
          }
      }

      return ul;
  }
}

function Submenu(link, label, id, menu) {
    Menu.call(this);
    this.link = link;
    this.label = label;
    this.id = id;
    this.menu = menu;

    this.render = function () {
        let li = document.createElement('li');
        li.id = this.id;
        let a = document.createElement('a');
        a.href = this.link;
        a.textContent = this.label;
        li.appendChild(a);
        let ul = document.createElement('ul');

        for (let item in menu) {
            if (this.menu[item] instanceof MenuItem || this.menu[item] instanceof Submenu) {
                ul.appendChild(this.menu[item].render());
            }
        }

        li.appendChild(ul);
        return li;
    }
}

function MenuItem(my_id, link, label) {
    Container.call(this);
    this.id = my_id;
    this.link = link;
    this.label = label;

    this.render = function () {
        let li = document.createElement('li');
        li.id = this.id;
        let a = document.createElement('a');
        a.href = this.link;
        a.textContent = this.label;
        li.appendChild(a);

        return li;
    }
}

console.log("The second homework begins");

function parseJSONtoObject(items) {
    let my_items = {};

    for(let  i = 0; i < items.length; i++) {
        console.log("item = " + items[i].items);
        if(items[i].items) {
            my_items[i] = new Submenu(items[i].href, items[i].title, items[i].id, parseJSONtoObject(items[i].items));
        } else
            my_items[i] = new MenuItem(items[i].id, items[i].href, items[i].title);
    }

    return  my_items;
}

function fullMenuContent(xhr) {
    let my_items = {};

    if(xhr.readyState === 4) {
        if(xhr.status === 0) {
            let items = JSON.parse(xhr.responseText);
            console.log(items);

            let menu = new Menu('menu', 'menu', parseJSONtoObject(items.menu_items));
            document.body.appendChild(menu.render());
        }
    }
}

let xhr = false;
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else {
    try {
        xhr = new ActiveXObject('Msxml2.XMLHTTP');
    } catch(e) {
        try {
            shr = new ActiveXObject('Microsoft.XMLHTTP');
        } catch(e) {}
    }
}

if (!xhr) {
    alert("Error: It is not possible to create xhr");
}

xhr.onreadystatechange = function() {fullMenuContent(xhr)};
xhr.open('GET', "menu.json", true);
xhr.send();