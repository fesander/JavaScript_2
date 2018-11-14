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
        a.style = "background-image: url('" + this.link + "')";
        return a;
    }
}

function parseJSONtoGalleryItem(items) {
    let my_items = {};

    for(let  i = 0; i < items.length; i++) {
        my_items[i] = new GalleryItem(items[i].class, items[i].href);
    }

    return  my_items;
}

function fullGalleryContent(xhr) {

    if(xhrG.readyState === 4) {
        if(xhrG.status === 0) {
            let images = JSON.parse(xhrG.responseText);
            a = parseJSONtoGalleryItem(images.image_items);
            let gallery = new Gallery('container', a);
            rd = gallery.render();
            document.body.appendChild(gallery.render());
        }
    }
}

let xhrG = false;
if (window.XMLHttpRequest) {
    xhrG = new XMLHttpRequest();
} else {
    try {
        xhrG = new ActiveXObject('Msxml2.XMLHTTP');
    } catch(e) {
        try {
            xhrG = new ActiveXObject('Microsoft.XMLHTTP');
        } catch(e) {}
    }
}

if (!xhrG) {
    alert("Error: It is not possible to create xhr");
}

xhrG.onreadystatechange = function() {fullGalleryContent(xhrG)};
xhrG.open('GET', "menu.json", true);
xhrG.send();