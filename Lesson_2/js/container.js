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

function Submenu(id, my_class, link, label, menu) {
    Menu.call(this);
    this.link = link;
    this.label = label;
    this.id = id;
    this.menu = menu;
    this.my_class = my_class;

    this.render = function () {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = this.link;
        a.id = this.id;
        a.className = this.my_class;
        a.textContent = this.label;
        a.setAttribute("data-toggle", "dropdown");
        li.appendChild(a);
        let ul = document.createElement('ul');
        ul.className = "dropdown-menu";

        for (let item in menu) {
            if (this.menu[item] instanceof MenuItem || this.menu[item] instanceof Submenu) {
                ul.appendChild(this.menu[item].render());
            }
        }

        li.appendChild(ul);
        return li;
    }
}

function MenuItem(my_id, my_class, link, label) {
    Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.link = link;
    this.label = label;

    this.render = function () {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = this.link;
        a.id = this.id;
        a.className = this.className;
        a.textContent = this.label;
        a.setAttribute("data-toggle", "tab");
        li.appendChild(a);

        return li;
    }

    this.renderContentArea = function() {
        let div = document.createElement('div');
        div.className = "tab-pane fade";
        if (isNaN(this.className.match("active")))
            div.className += "active show";
        div.setAttribute("role", "tabpanel");
        div.setAttribute("aria-labelledby", this.id);
        let regular = "[a-zA-Z]+";
        div.id = this.link.match(regular);
        return div;
    }
}

function Content(my_id, my_class, item) {
    Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.items = item;

    this.render = function () {
        let div = document.createElement('div');
        div.className = this.className;
        div.id = this.id;

        // for (let item in items) {
        //     if (this.items[item] instanceof MenuItem) {
        //         div.appendChild(this.items[item].renderContentArea());
        //     }
        // }

        return div;
    }
}

function TextContent(items) {
    Container.call(this);
    this.items = items;

    this.render = function () {
        let div = document.createElement('div');
 //       div.classList = "container";

        for (let item in items) {
            if (this.items[item]){
                let p = document.createElement('p');
                p.textContent = this.items[item].paragraph;
                p.classList = "paragraphs lead";
                div.appendChild(p);
            }
        }
        let button = document.createElement('button');
        button.classList = "btn btn-secondary btn-lg";
        button.textContent = "Форматтирование";
        button.setAttribute("type", "button");
        button.id = "formatting";
        div.appendChild(button);
        return div;
    }
}

function Form(items) {
    Container.call(this);
    this.items = items;
    this.render = function () {
        let form = document.createElement('form');

        for (let item in items) {
            if (this.items[item]){
                this.id = this.items[item].id;
                this.placeholder = this.items[item].placeholder;
                this.text = this.items[item].text;
                let div = document.createElement('div');
                div.classList = "form-group lead";

                let label = document.createElement("label");
                label.setAttribute("for",this.id);
                label.innerText = this.text;
                div.appendChild(label);

                if(this.id.toLowerCase().indexOf("textarea") !== -1) {
                    let textArea = document.createElement("textarea");
                    textArea.id = this.id;
                    textArea.classList = "form-control";
                    textArea.setAttribute("placeholder", this.placeholder);
                    textArea.setAttribute("rows", "3");
                    div.appendChild(textArea);

                } else {
                    let input = document.createElement("input");
                    input.id = this.id;
                    input.classList = "form-control";
                    input.setAttribute("placeholder", this.placeholder);
                    div.appendChild(input);
                }

                form.appendChild(div);
            }
        }
        let button = document.createElement('button');
        button.classList = "btn btn-primary";
        button.textContent = "Валидация";
        button.setAttribute("type", "button");
        button.id = "validation";
        form.appendChild(button);
        return form;
    }
}

function PromoContainer(className, items) {
    Container.call(this);
    this.className = className;
    this.items = items;

    this.render = function () {
        let div = document.createElement('div');
        div.className = this.className;
        div.appendChild(this.items.render());

        return div;
    }
}

function Image(my_link) {
    Container.call(this);
    this.link = my_link;
    this.id = "";
    this.className = "";

    this.render = function () {
        let img = document.createElement('img');
        img.src = this.link;
        img.className += 'smallImage';
        return img;
    }
}

function Gallery(className, items) {
    Container.call(this);
    this.className = className;
    this.items = items;

    this.render = function () {
        let div = document.createElement('div');
        div.className = this.className;

        for (let item in items) {
            if (this.items[item] instanceof GalleryItem) {
                div.appendChild(this.items[item].render());
            }
        }

        return div;
    }
}

function GalleryItem(my_class, my_link) {
    Container.call(this);
    this.class = my_class;
    this.link = my_link;

    this.render = function () {
        let a = document.createElement('a');
        a.className = this.class;
        a.className += ' smallImage';
        a.target = '_blank';
        a.href = this.link;
        // Вставка стиль прямо в html, это позволяет обдейтить только json файл,
        // для добавления новых картинок и не трогать файл стилей
        a.style = "background-image: url('" + this.link + "')";
        return a;
    }
}