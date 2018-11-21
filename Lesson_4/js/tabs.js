$.ajax({
    type: "POST",
    url: "json/menu.json",
    dateType: "json",
    success: function (date, status) {

        let menu = new Menu('menu', 'navigation', parseJsonMenuItems(JSON.parse(date).menu_items));
        $(".container").append(menu.render());

        mainPageContent();

        let tabs = $(".tab");
        for (let tab = 0; tab < tabs.length; tab++) {
            tabs[tab].addEventListener("click", switchTab, false);
        }

        let content = new Content('myTabContent', 'content');
        $(".container").append(content.render());
    }
})

function parseJsonMenuItems(items) {
    let my_items = {};

    for(let  i = 0; i < items.length; i++) {
        my_items[i] = new MenuItem(items[i].id, items[i].class, items[i].title);
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

function switchTab() {
    $(".active").removeClass("active");
    $(this).addClass("active")
    console.log("Current tab = " + this.id);
    if ($("#myTabContent").length)
        $("#myTabContent").remove();

    let content = new Content('myTabContent', 'content');
    $(".container").append(content.render());
    switch (this.id) {
        case "home-tab":
            mainPageContent();
            break;
        case "gallery-tab":
            fullGalleryContent();
            break;
        case "sale-tab":
            saleAvaleble();
            break;
        case "contact-tab":
            contactPage();
            break;
    }
}

function mainPageContent() {
    $.ajax({
        type: "POST",
        url: "json/menu.json",
        dateType: "json",
        success: function (date, status) {

            let text = new TextContent(JSON.parse(date).text_content);
            console.log(text.render());
            $("#myTabContent").append(text.render());

            $("#formatting")[0].addEventListener("click", textFormat, false);
        }
    })
}

function textFormat() {
    let items = $(".paragraphs");
    let div = document.createElement('div');
    let newText = [];
    for (let item = 0; item < items.length; item++) {
        text = items[item].textContent;
        if (text !== undefined) {
            console.log(text);
            let regexp = (/\B\'|\'\B/g);
            text = text.replace(regexp, "\"");
        }
        newText[item] = {"paragraph": text};
    }
    $("#myTabContent").remove();
    let content = new Content('myTabContent', 'content');
    $(".container").append(content.render());

    let article = new TextContent(newText);
    $(".content").append(article.render());
}

function fullGalleryContent() {
    $.ajax({
        type: "POST",
        url: "json/menu.json",
        dateType: "json",
        success: function (date, status) {

            let images = new Gallery('gallery', parseJSONtoGalleryItem(JSON.parse(date).image_items));
            console.log(images.render());
            $("#myTabContent").append(images.render());

        }
    });
}

function saleAvaleble() {
// Вызов случайного json файла в зависимости от рандомного числа
    let randomJson = (Math.random() >= 0.5) ? "json/success.json" : "json/error.json";
    $.ajax({
        type: "POST",
        url: randomJson,
        dateType: "json",
        success: function (date, status) {

            let result = JSON.parse(date);
            if(result.result === "error")
                img = new Image("images/sad.jpg");
            else
                img = new Image("images/promo.jpg");

            container = new PromoContainer("container", img);
            $("#myTabContent").append(img.render());
        }
    });
}

function contactPage() {
    $.ajax({
        type: "POST",
        url: "json/menu.json",
        dateType: "json",
        success: function (date, status) {

            let form = new Form(JSON.parse(date).form_content);
            $("#myTabContent").append(form.render());


            $.ajax({
                type: "POST",
                url: "json/cities.json",
                dateType: "JSON",
                success: function (date, status) {
                    myCityList = JSON.parse(date).city;
                    for(city in myCityList) {
                        let option = document.createElement("option");
                        option.value = myCityList[city].name;
                        $("#cities").append(option);
                    }
                }
            });

            $("#validation")[0].addEventListener("click", formValidation, false);
        }
    });
}

function formValidation() {
    let nameRegexp = /^[a-zA-Zа-яА-Я]{2,10}$/;
    let name = document.getElementById("userName");
    let nameRegExpValue = name.value.match(nameRegexp);
    if (nameRegExpValue === null) {
        name.className = "form-control validation-fail";
        alert("Неверное имя\nДопустимы только русские и английские буквы обоих регистров\nДлина имени от 2 до 10 символов");
    } else {
        name.className = "form-control validation-pass";
    }

    let phoneRegexp = /^\+[0-9]\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
    let phone = document.getElementById("userPhone");
    let phoneRegExpValue = phone.value.match(phoneRegexp);
    if (phoneRegExpValue === null) {
        phone.className = "form-control validation-fail";
        alert("Неверное формат телефона\nВведи номер в следующем формате +7(000)000-0000");
    } else {
        phone.className = "form-control validation-pass";
    }

    let emailRegexp = /^[a-zA-Z\.\-]+\@[a-z]{2,5}\.[a-z]{1,3}$/;
    let email = document.getElementById("userEmail");
    let emailRegExpValue = email.value.match(emailRegexp);
    if (emailRegExpValue === null) {
        email.className = "form-control validation-fail";
        alert("Неверное Адрес электронной почты\nПримеры ввода:\nmymail@mail.ru\nmy.mail@mail.ru\nmy-mail@mail.ru");
    } else {
        email.className = "form-control validation-pass";
    }
}
