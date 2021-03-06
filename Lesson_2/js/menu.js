// Рекурсивная функция, позволяющая получить любую степень вложенности меню
function parseJSONtoObject(items) {
    let my_items = {};

    for(let  i = 0; i < items.length; i++) {
        if(items[i].items) {
            my_items[i] = new Submenu(items[i].id, items[i].class, items[i].href, items[i].title, parseJSONtoObject(items[i].items));
        } else
            my_items[i] = new MenuItem(items[i].id, items[i].class, items[i].href, items[i].title);
    }

    return  my_items;
}

function parseJSONtoGalleryItem(items) {
    let my_items = {};

    for(let  i = 0; i < items.length; i++) {
        my_items[i] = new GalleryItem(items[i].class, items[i].href);
    }

    return  my_items;
}

function fullMenuContent(xhr) {
    let my_items = {};

    if(xhr.readyState === 4) {
        if(xhr.status === 0) {
            let items = JSON.parse(xhr.responseText);
            console.log(items);

            let menu = new Menu('myTab', 'nav nav-tabs', parseJSONtoObject(items.menu_items));
            let header = document.createElement('header');
            header.appendChild(menu.render());
            document.body.appendChild(header);
            let content = new Content('myTabContent', 'tab-content', "main_tab");
            document.body.appendChild(content.render());
            mainPageContent(xhr);

            let el = document.getElementsByClassName("nav-link");
            for (let i = 0; i < el.length; i++)
                if (!el[i].classList.contains("dropdown-toggle"))
                    el[i].addEventListener("click", modifyText, false);
        }
    }
}

function modifyText() {
    console.log("Current tab = " + this.id);
    if(document.getElementById("myTabContent"))
        document.getElementById("myTabContent").remove();

    let content = new Content('myTabContent', 'tab-content', this.id);
    document.body.appendChild(content.render());
    switch (this.id) {
        case "home-tab":
            mainPageContent(xhr);
            break;
        case "catalog-man":
            alert("Страница не готова. Перехожу на главную");
            mainPageContent(xhr);
            break;
        case "catalog-woman":
            alert("Страница не готова. Перехожу на главную");
            mainPageContent(xhr);
            break;
        case "gallery-tab":
            fullGalleryContent(xhr);
            break;
        case "sale-tab":
            saleAvaleble();
            break;
        case "contact-tab":
            contactPage();
            break;
    }
}

function parseJSONtoParagraphs(items) {
    let my_items = {};

    for(let  i = 0; i < items.length; i++) {
        my_items[i] = new GalleryItem(items[i].class, items[i].href);
    }

    return  my_items;
}

function mainPageContent(xhr) {

    if(xhr.readyState === 4) {
        if(xhr.status === 0) {
            let paragraphs = JSON.parse(xhr.responseText);
            container = document.getElementById("myTabContent");
            let article = new TextContent(paragraphs.text_content);
            container.appendChild(article.render());
            document.getElementById("formatting").addEventListener("click", textFormat, false);
        }
    }
}

function textFormat() {
//    console.log("Formatting");
    let items = document.getElementsByClassName("paragraphs");
    let div = document.createElement('div');
    let newText = [];
    for (let item = 0; item < items.length; item++) {
        text = items[item].textContent;
        if (text !== undefined) {
            console.log(text);
            let regexp = (/\'/g);
            text = text.replace(regexp, function (free) {
            // Попытка сделать еще дополнительное выделение текста через innerHTML
            // то я в полученом текста вижу span строкой, а не элементом DOM
            // <span class="red">"</span>60 Minutes<span class="red">"</span>
                // span = document.createElement("span");
                // span.classList = "red";
                // span.innerText = "\"";
                // div = document.createElement("div");
                // div.appendChild(span);
                // return div.innerHTML;
                return "\"";
            });
            text = text.replace(/[n]\"[t]/g, "n't");
        }
        newText[item] = {"paragraph": text};
    }
    document.getElementById("myTabContent").remove();
    let content = new Content('myTabContent', 'tab-content', this.id);
    document.body.appendChild(content.render());
    container = document.getElementById("myTabContent");

    let article = new TextContent(newText);
    container.appendChild(article.render());
}

function parseJSONtoGalleryItem(items) {
    let my_items = {};

    for(let  i = 0; i < items.length; i++) {
        my_items[i] = new GalleryItem(items[i].class, items[i].href);
    }

    return  my_items;
}

function fullGalleryContent(xhr) {

    if(xhr.readyState === 4) {
        if(xhr.status === 0) {
            let images = JSON.parse(xhr.responseText);
            a = parseJSONtoGalleryItem(images.image_items);
            container = document.getElementById("myTabContent");
            let gallery = new Gallery('container', a);
            container.appendChild(gallery.render());
        }
    }
}

function contactPage() {
    let paragraphs = JSON.parse(xhr.responseText);
    container = document.getElementById("myTabContent");
    container.classList = "tab-content container";
    let form = new Form(paragraphs.form_content);
    container.appendChild(form.render());
    document.getElementById("validation").addEventListener("click", formValidation, false);
}

function formValidation() {
    let nameRegexp = /^[a-zA-Zа-яА-Я]{2,10}$/;
    let name = document.getElementById("exampleFormControlName");
    let nameRegExpValue = name.value.match(nameRegexp);
    if (nameRegExpValue === null) {
        name.className = "form-control validation-fail";
        alert("Неверное имя\nДопустимы только русские и английские буквы обоих регистров\nДлина имени от 2 до 10 символов");
    } else {
        name.className = "form-control validation-pass";
    }

    let phoneRegexp = /^\+[0-9]\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
    let phone = document.getElementById("exampleFormControlPhone");
    let phoneRegExpValue = phone.value.match(phoneRegexp);
    if (phoneRegExpValue === null) {
        phone.className = "form-control validation-fail";
        alert("Неверное формат телефона\nВведи номер в следующем формате +7(000)000-0000");
    } else {
        phone.className = "form-control validation-pass";
    }

    let emailRegexp = /^[a-zA-Z\.\-]+\@[a-z]{2,5}\.[a-z]{1,3}$/;
    let email = document.getElementById("exampleFormControlInput1");
    let emailRegExpValue = email.value.match(emailRegexp);
    if (emailRegExpValue === null) {
        email.className = "form-control validation-fail";
        alert("Неверное Адрес электронной почты\nПримеры ввода:\nmymail@mail.ru\nmy.mail@mail.ru\nmy-mail@mail.ru");
    } else {
        email.className = "form-control validation-pass";
    }
}

function saleAvaleble() {
// Вызов случайного json файла в зависимости от рандомного числа
    xhr4.onreadystatechange = function() {errorOrSuccess(xhr4)};
    (Math.random() >= 0.5) ? xhr4.open('GET', "json/success.json", true) : xhr4.open('GET', "json/error.json", true);
    xhr4.send();
}
function errorOrSuccess(xhr4) {

    if(xhr4.readyState === 4) {
        if(xhr4.status === 0) {
            let result = JSON.parse(xhr4.responseText);
            let img;
            let div = document.createElement('div');
            div.className = "container";

            // Вывод картинки в зависимости от json файла.
            if(result.result === "error")
                img = new Image("images/sad.jpg");
            else
                img = new Image("images/promo.jpg");

            cont = document.getElementById("myTabContent");
            container = new PromoContainer("container", img);
            cont.appendChild(container.render());
//            document.body.appendChild(container.render());
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
xhr.open('GET', "json/menu.json", true);
xhr.send();

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