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
        let $image = $('<div/>').attr({
            "class": this.class,
            "id": this.id,
            "style": "background-image: url('" + this.link + "')"
        });
        return $image;
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