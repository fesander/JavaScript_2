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