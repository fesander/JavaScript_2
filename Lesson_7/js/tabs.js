let mainContainer = $(".container");

$.ajax({
    type: "GET",
    url: "http://localhost:4000/menu_items",
    dateType: "json",
    success: function (menu_items) {

        let my_items = [];
        menu_items.forEach(function (menu_item) {
            let item = new MenuItem(menu_item.id, menu_item.class, menu_item.title);
            my_items.push(item);
        });
        let menu = new Menu('menu', 'navigation', my_items);
        mainContainer.append(menu.render());

        mainPageContent();

         // language=JQuery-CSS
        let tabs = $(".tab");
         for (let tab = 0; tab < tabs.length; tab++) {
             tabs[tab].addEventListener("click", switchTab, false);
        }

        let content = new Content('myTabContent', 'content');
        mainContainer.append(content.render());
    }
});

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
    mainContainer.append(content.render());
    switch (this.id) {
        case "home-tab":
            mainPageContent();
            break;
        case "gallery-tab":
            fullGalleryContent();
            break;
        case "shop-tab":
            shopContent();
            break;
        case "sale-tab":
            saleAvaleble();
            break;
        case "palindrom-tab":
            checkIfPalindrom();
            break;
        case "contact-tab":
            contactPage();
            break;
    }
}
function checkIfPalindrom() {
    console.log('Palingrom');
}
function mainPageContent() {
    $.ajax({
        type: "GET",
        url: "http://localhost:4000/text_content",
        dateType: "json",
        success: function (text_content) {

            let text = new TextContent(text_content);
            console.log(text.render());
            $("#myTabContent").append(text.render());

            $("#formatting").eq(0).on("click", function (event) {
                textFormat();
            });
        }
    })
}

function textFormat() {
    let items = $(".paragraphs");
    let div = $('<div/>');
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
    mainContainer.append(content.render());

    let article = new TextContent(newText);
    $(".content").append(article.render());
}

function fullGalleryContent() {
    $.ajax({
        type: "GET",
        url: "http://localhost:4000/image_items",
        dateType: "json",
        success: function (image_items) {

            let my_items = [];
            image_items.forEach(function (image_item) {
                let item = new GalleryItem(image_item.class, image_item.href);
                my_items.push(item);
            });

            let images = new Gallery('gallery', my_items);
            console.log(images.render());
            $("#myTabContent").append(images.render());

        }
    });
}

function saleAvaleble() {
// Вызов случайного json файла в зависимости от рандомного числа
    let randomJson = (Math.random() >= 0.5) ? "http://localhost:4000/success" : "http://localhost:4000/error";
    $.ajax({
        type: "GET",
        url: randomJson,
        dateType: "json",
        success: function (result) {

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
        type: "GET",
        url: "http://localhost:4000/form_content",
        dateType: "json",
        success: function (form_content) {

            let form = new Form(form_content);
            $("#myTabContent").append(form.render());

            $( "#datepicker" ).datepicker({
                dateFormat: "dd.mm.yy",
                changeYear: true

            });

            $("#validation")[0].addEventListener("click", formValidation, false);
        }
    });
}

function formValidation() {
    let $messageBlock = $('<div/>').attr('id','dialog');
    let $message = $('<p/>').attr('id','errorMessage');
    $messageBlock.append($message);
    $('.container').append($messageBlock);
    checkName($messageBlock);
}

function checkName($messageBlock) {
    let $message = $('#errorMessage');
    let nameRegexp = /^[a-zA-Zа-яА-Я]{2,10}$/;
    let $name = $("#userName");
    let nameRegExpValue = $name.val().match(nameRegexp);
    if (nameRegExpValue === null) {
        $name.toggle("bounce", {times: 3}, "slow");
        $name.toggle("bounce", {times: 3}, "slow");
        $name.addClass('validation-fail');
        $message.text("Неверное имя\nДопустимы только русские и английские буквы обоих регистров\nДлина имени от 2 до 10 символов")

        $("#dialog").dialog({
            dialogClass: "no-close",
            modal: true,
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ],
            close: function (event, ui) {
                checkPhone($messageBlock);
            }
        });
    } else {
        $name.removeClass('validation-fail');
        $name.addClass('validation-pass');
        checkPhone($messageBlock);
    }
}
function checkPhone($messageBlock) {
    let $message = $('#errorMessage');
    $messageBlock.append($message);
    let phoneRegexp = /^\+[0-9]\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
    let $phone = $('#userPhone');
    let phoneRegExpValue = $phone.val().match(phoneRegexp);
    if (phoneRegExpValue === null) {
        $phone.toggle( "bounce", { times: 3 }, "slow" );
        $phone.toggle( "bounce", { times: 3 }, "slow" );
        $phone.addClass('validation-fail');
        $message.text("Неверное формат телефона\\nВведи номер в следующем формате +7(000)000-0000");

        $("#dialog").dialog({
            dialogClass: "no-close",
            modal: true,
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ],
            close: function (event, ui) {
                checkEmail($messageBlock);
            }
        });
    } else {
        $phone.removeClass('validation-fail');
        $phone.addClass('validation-pass');
        checkEmail($messageBlock);
    }
}
function checkEmail($messageBlock) {
    let $message = $('#errorMessage');
    let emailRegexp = /^[a-zA-Z\.\-]+\@[a-z]{2,5}\.[a-z]{1,3}$/;
    let $email = $('#userEmail');
    let emailRegExpValue = $email.val().match(emailRegexp);
    if (emailRegExpValue === null) {
        $email.toggle( "bounce", { times: 3 }, "slow" );
        $email.toggle( "bounce", { times: 3 }, "slow" );
        $email.addClass('validation-fail');
        $message.text("Неверное Адрес электронной почты\nПримеры ввода:\nmymail@mail.ru\nmy.mail@mail.ru\nmy-mail@mail.ru");

        $("#dialog").dialog({
            dialogClass: "no-close",
            modal: true,
            buttons: [
                {
                    text: "OK",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ],
            close: function (event, ui) {
                $("#dialog").dialog( "close" );
            }
        });
    } else {
        $email.removeClass('validation-fail');
        $email.addClass('validation-pass');
        $email.className = "form-control validation-pass";
    }
}