function Container() {
    this.id = 'container';
    this.className = 'container';

    this.render = function () {
        let $div = $('<div/>');
        $div.id = this.id;
        $div.className = this.className;
        return div;
    };

    this.remove = function () {
        $(this.id).remove();
    }
}

function GoodItem(my_id, my_class) {
    Container.call(this);
    this.id = my_id;
    this.class = my_class;
    this.link = "images/"+my_id+".jpg";

    this.render = function () {
        return $('<div/>').attr({
            "class": this.class,
            "id": this.id,
            "style": "background-image: url('" + this.link + "')"
        });
    }
}

function CartItem(my_name, my_cost, my_id, dataBaseId) {
    Container.call(this);
    this.name = my_name;
    this.cost = my_cost;
    this.id = my_id;
    this.dbID = dataBaseId;

    this.render = function () {
        let good = $('<div/>').addClass('oneChair');
        good.attr( {
            "id" : this.id,
            "dataBaseId" : this.dbID
        });

        let quantity = $('<div/>').addClass('number');
        quantity.text("1");
        let product = $('<div/>').addClass('product');
        product.text(this.name);
        let price = $('<div/>').addClass('sum');
        price.attr("value", this.cost);
        price.text(this.cost + ' p.');

        let quantityManging = $('<div/>').addClass('quantityManging');
        let adding = $('<div/>').addClass('icon increase');
        let deleting = $('<div/>').addClass('icon decrease');
        quantityManging.append(adding,deleting);

        good.append(quantity, product, price, quantityManging);
        return good;
    }
}

function CartItemTotalSum(totalSum) {
    Container.call(this);
    this.sum = totalSum;

    this.render = function () {
        let total = $('<h3/>');
        total.text("Всего: ");

        let price = $('<span/>').attr('id', 'total-sum');
        price.text(this.sum + ' p.');

        total.append(price);
        return total;
    }
}

function ReviewItem(my_name,text,dataBaseId,approved) {
    Container.call(this);
    this.name = my_name;
    this.text = text;
    this.dbID = dataBaseId;
    this.approved = approved;

    this.render = function () {
        let $item = $('<div/>').addClass("reviewBeforeApprovalItem");
        $item.attr("dataBaseId",this.dbID);

        let $checkApprove = $('<div/>');
        if(this.approved) {
            $checkApprove.addClass("approved");
        }

        let $person = $('<div/>').attr('id', "name");
        $person.text(this.name);
        let $review = $('<div/>').attr('id', "text");
        $review.text(this.text);

        $item.append($checkApprove,$person,$review);

        if(!this.approved) {
            let $button = $('<div/>').addClass("denied_approve");
            let $denied =  $('<div/>').addClass("denied");
            $denied.text("DELL");
            let $approve =  $('<div/>').addClass("approve");
            $approve.text("POST");
            $button.append($denied,$approve);
            $item.append($button);
        }
        return $item;
    }
}

function Menu(id, className, items) {
    Container.call(this);
    this.id = id;
    this.className = className;
    this.items = items;

    this.render = function () {
        let $ul = $('<ul/>').addClass(this.className);
        $ul.attr('id',this.id);

        for (let item in items) {
            if(items.hasOwnProperty(item)){
                if (this.items[item] instanceof MenuItem) {
                    $ul.append(this.items[item].render());
                }
            }
        }
        return $ul;
    }
}

function MenuItem(my_id, my_class, label) {
    Container.call(this);
    this.id = my_id;
    this.className = my_class;
    this.label = label;

    this.render = function () {
        let $li = $('<li/>').addClass(this.className);
        $li.attr('id', this.id).text(this.label);
        return $li;
    };

    this.renderContentArea = function() {
        let $div = $('<div/>').addClass('tab-pane fade');
        if (isNaN(this.className.match("active")))
            $div.addClass('active show');
        let regular = "[a-zA-Z]+";
        $div.attr({
            'role' : 'tabpanel',
            'aria-labelledby' : this.id,
            'id': this.link.match(regular)
        });
        return $div;
    }
}

///////////////////////////////////////////////////////////

function Content(my_id, my_class) {
    Container.call(this);
    this.id = my_id;
    this.className = my_class;

    this.render = function () {
        let div = document.createElement('div');
        div.className = this.className;
        div.id = this.id;
        return div;
    }
}

function TextContent(items) {
    Container.call(this);
    this.items = items;

    this.render = function () {
        let div = document.createElement('div');

        for (let item in items) {
            if (this.items[item]){
                let p = document.createElement('p');
                p.textContent = this.items[item].paragraph;
                p.classList = "paragraphs lead";
                div.appendChild(p);
            }
        }
        let button = document.createElement('button');
        button.classList = "button";
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
        let $form = $('<form/>');
        let $div_left = $('<div/>');
        let $div_right = $('<div/>');

        for (let item in items) {
            if (this.items[item]){
                this.id = this.items[item].id;
                this.placeholder = this.items[item].placeholder;
                this.text = this.items[item].text;
                let $div = $('<div/>');

                let $label = $('<label/>').attr("for",this.id);
                $label.text(this.text);
                $div.append($label);

                if(this.id === "datepicker") {
                    let input = $('<input/>').attr({
                        'placeholder' : this.placeholder,
                        'id' : this.id
                    });
                    $div.append(input);
                    $div_right.append($div);
                }
                else if(this.id.toLowerCase().indexOf("textarea") !== -1) {
                    let $textArea = $('<textarea/>').attr({
                        'placeholder' : this.placeholder,
                        'id' : this.id,
                        'rows' : 3
                    });
                    $div.append($textArea);
                    $div_left.append($div);

                } else {
                    let $input = $('<input/>').attr({
                        'placeholder' : this.placeholder,
                        'id' : this.id
                    });
                    $div.append($input);
                    $div_left.append($div);
                }

            }
        }
        let $button = $('<button/>').addClass('button').attr({
            'type' : 'button',
            'id' : 'validation'
        });
        $button.text('Валидация');
        $div_left.append($button);

        $form.append($div_left);
        $form.append($div_right);
        return $form;
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
        let $img = $('<img/>').attr("src",this.link).addClass('smallImage');
        return $img;
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