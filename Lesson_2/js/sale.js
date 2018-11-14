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

function errorOrSuccess(xhr4) {

    if(xhr4.readyState === 4) {
        if(xhr4.status === 0) {
            let result = JSON.parse(xhr4.responseText);
            let img;
            let div = document.createElement('div');
            div.className = "container";

            if(result.result === "error")
                img = new Image("images/sad.jpg");
            else
                img = new Image("images/promo.jpg");

            container = new PromoContainer("container", img);
            document.body.appendChild(container.render());
        }
    }
}

let xhr4 = false;
if (window.XMLHttpRequest) {
    xhr4 = new XMLHttpRequest();
} else {
    try {
        xhr4 = new ActiveXObject('Msxml2.XMLHTTP');
    } catch(e) {
        try {
            xhr4 = new ActiveXObject('Microsoft.XMLHTTP');
        } catch(e) {}
    }
}

if (!xhr4) {
    alert("Error: It is not possible to create xhr");
}
xhr4.onreadystatechange = function() {errorOrSuccess(xhr4)};
(Math.random() >= 0.5) ? xhr4.open('GET', "json/success.json", true) : xhr4.open('GET', "json/error.json", true);
xhr4.send();