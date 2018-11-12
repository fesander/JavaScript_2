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

      for (let i = 0; i < this.items.length; i++) {
          if (this.items[i] instanceof MenuItem || this.items[i] instanceof Submenu) {
              ul.appendChild(this.items[i].render());
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

        for (let i = 0; i < this.menu.length; i++) {
            if (this.menu[i] instanceof MenuItem ) {
                ul.appendChild(this.menu[i].render());
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