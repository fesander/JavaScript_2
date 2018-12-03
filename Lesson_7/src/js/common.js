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
let palindroms = [
    "Несколько не палиндромов",
    "Очень интересное задание",
    "А теперь пошли палиндромы",
    "А за работу дадут? – Оба раза!",
    "А в Енисее – синева",
    "А к долу лодка",
    "А кобыле цена дана, да не целы бока",
    "А Луна канула",
    "А масса налево повела нас сама",
    "А муза – раба разума",
    "Madam, I'm Adam",
    "A man, a plan, a canal-Panama",
    "\"Not New York\", – Roy went on",
    "Do geese see God?"
];

function isPalindrom(a) {

    // Вариант -3 = 88 символов, зато честно
    a = a.replace(/[^а-яa-z]/ig,'');
    return a.match(RegExp( a.split('').reverse().join(''), "i"));

    // Вариант -2 = 75 символов без пробелов. Лайвхак в том что сразу передаю строку
    // в пижмем регистре. на этом экономлю 15 символов.
    // a = a.replace(/[^а-яa-z]/g,'');
    // return a.match(a.split('').reverse().join(''));

    // Вариант -1 = 93 символоб без пробелов
    // a = a.replace(/[^а-яa-z]/ig,'').toLowerCase();
    // return a.includes(a.split('').reverse().join(''));

    // Вариант 0 = 98 символов без пробелов
    // a = a.replace(/[^а-яa-z]/ig,'').toLowerCase();
    // return (a === a.split('').reverse().join('')) ? true : false;

    // Вариант 1 = 101 символ без пробелов
    // a = a.replace(/[^а-яa-z]/ig,'').toLowerCase();
    // for (i in a)
    //     if(a[i] != a[a.length-i-1])
    //         return false;
    // return true;

    // Вариант 2 = 130 символов без пробелов
    // b = [];
    // for(i in a)
    //     if(a[i].match(/[a-zA-Zа-яА-Я]/))
    //         b.push(a[i].toLowerCase());
    // for(i in b)
    //     if(b[i] != b[b.length-i-1])
    //         return false;
    // return true;


    // Вариант 3 - 202 символа без пробелов
    // for (i=0, j=a.length-1; i < a.length/2, i<=j;)
    //     if(a[i].match(/[a-zA-Zа-яА-Я]/)){
    //         if(a[j].match(/[a-zA-Zа-яА-Я]/)) {
    //             if(a[i].toLowerCase() != a[j].toLowerCase())
    //                 return false;
    //             else {
    //                 j--;
    //                 i++
    //             }
    //         }
    //         else
    //             j--;
    //     }
    //     else
    //         i++;
    // return true;


    // Вариант 4 = 225 символов без пробелов
    // while(a.length > 1) {
    //     if(a[0].match(/[a-zA-Zа-яА-Я]/)){
    //         if(a.substr(-1).match(/[a-zA-Zа-яА-Я]/)) {
    //             if(a.substr(-1).toLowerCase() != a[0].toLowerCase())
    //                 return false;
    //             else
    //                 a = a.slice(1,-1);
    //         }
    //         else
    //             a = a.slice(0, -1);
    //     }
    //     else
    //         a = a.slice(1);
    // }
    // return true;
}
for (sentence in palindroms) {
    if (isPalindrom(palindroms[sentence]))
        console.log("\'" + palindroms[sentence] + "\' - это палиндром");
    else
        console.log("\'" + palindroms[sentence] + "\' - это не пaлиндром");
}


function shopContent() {
    let $photo = $('<div/>').addClass('photo');
    let $arrowLeft = $('<div/>').addClass('arrow').attr('id','arrow-left').append($('<i/>').addClass('fas fa-arrow-left'));
    let $arrowRight = $('<div/>').addClass('arrow').attr('id','arrow-right').append($('<i/>').addClass('fas fa-arrow-right'));
    let $bigPhoto = $('<div/>').attr('id','big');
    let $smallPhoto = $('<div/>').addClass('small');
    $photo.append($arrowLeft,$arrowRight,$bigPhoto,$smallPhoto);


    let $choosenGood = $('<div/>').addClass('choosenGood');
    let $form = $('<form/>').attr('action','post');
    let $lableName = $('<lable/>').attr('for','userName');
    $lableName.text("Ваше Имя");
    let $inputName = $('<input/>').attr({
        'id' : 'userName',
        'placeholder' : 'Иван'
    });
    let $name = $('<div/>').append($lableName,$inputName);
    let $lableText = $('<lable/>').attr('for','userTextarea');
    $lableText.text("Отзыв");
    let $inputText = $('<input/>').attr({
        'id' : 'userTextarea',
        'placeholder' : 'Текст вашего отзыва'
    });
    let $text = $('<div/>').append($lableText,$inputText);
    let $button = $('<buttpn/>').addClass('button').attr({
        'id' : 'submit',
        'type' : 'button'
    });
    $button.text('Отправить');
    $form.append($name,$text,$button);
    $choosenGood.append($form);

    let $cart = $('<div/>').addClass('cart');
    let $cartHeader = $('<h3/>');
    $cartHeader.text('Корзина');
    let $cartSum = $('<h3/>').append($('<span/>').attr('id','total-sum'));
    $cartSum.text('Всего: ');
    $cart.append($cartHeader,$cartSum);

    let $cartIcon = $('<div/>').attr('id','cartIcon').append($('<div/>').attr('id','goodsCount'));

    $("#myTabContent").append($cart,$photo,$choosenGood,$('<div/>').addClass('reviewBeforeApproval'),$cartIcon);


    $('#cartIcon').droppable({
        over: function (event) {
            let my_id;
            let my_title;
            let my_cost;
            $.ajax({ type: "GET",
                url: "http://localhost:4000/goods",
                dateType: "json",
                success: function (goods) {
                    goods.forEach(function (good) {
                        if(good.id === event.toElement.id) {
                            my_id = good.id;
                            my_title = good.title;
                            my_cost = good.cost;
                        }
                    });
                }
            });


            $.ajax({
                type: "POST",
                url: "http://localhost:4000/cart",
                contentType: "application/json",
                data: JSON.stringify({
                    goodId: my_id,
                    title: my_title,
                    cost: my_cost
                }),
                success: function(data) {
                    changeTotalgoods("increase");
                }
            });
        }
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:4000/goods",
        dateType: "json",
        success: function (goods) {

            let $smallImages = $('.small');
            goods.forEach(function (good) {
                let img = new GoodItem(good.id, good.class);
                $smallImages.append(img.render());
                $('#'+good.id).draggable({revert: true});
            });

            $('#cartIcon').on('click', function (event) {
                displayCart();
            });

            getInitialGoodsInCart();
            showBigImage();
            sentForApprovalReviews();

            $('#goodsCount').text(totalGoods);

            $('.arrow').on('click',function (event) {
                let currentElement = goods.find(x => x.id == $('.active_product').attr('id'));
                let indexNumber = goods.indexOf(currentElement);
                let nextElementId;
                $('.active_product').removeClass('active_product');
                if(indexNumber === 0 && this.id === 'arrow-left')
                    nextElementId = goods[goods.length-1].id;
                else if (indexNumber === goods.length-1 && this.id === 'arrow-right')
                    nextElementId = goods[0].id;
                else if (this.id === 'arrow-left')
                    nextElementId = goods[indexNumber-1].id;
                else if (this.id === 'arrow-right')
                    nextElementId = goods[indexNumber+1].id;
                $('#'+nextElementId).addClass('active_product');
                showBigImage();
            });

            $('.chair').on('click',function (event) {
                $('.active_product').removeClass('active_product');
                $(this).addClass('active_product');
                showBigImage();
            });
        }
    });
}

/**
 *
 * @type {number} количество товаров в корзине
 */
let totalGoods = 0;

/**
 * Вычисляет сколько чейчас товаров в корзине и вставляет это значение в иконку #goodsCount
 */
function getInitialGoodsInCart() {
    $.ajax({
        type: "GET",
        url: "http://localhost:4000/cart/",
        dateType: "json",
        success: function (good) {
            totalGoods = good.length;
            $('#goodsCount').text(totalGoods);
        }
    });
}

/**
 * Находит актиную картинку, отрисовывает её большое изображение и выводит не экран описание товара
 */
function showBigImage() {
    let $activeElement = $('.active_product').attr('id');
    let $bigImage = "images/"+$activeElement+".jpg";
    $('#big').attr("style","background-image: url('" + $bigImage + "')");
    showDescription($activeElement);
}

/**
 * Отрисовка корзины
 */
function displayCart() {
    // Общая цена товаров в корзине
    let totalSum = 0;
    // Делаем весь остальной контент слегка прозрачным
    $(".photo").addClass("halfOpacity");
    $(".chosenGood").addClass("halfOpacity");
    $(".cart").addClass("displayMe");

    // Закрытие корзины при клике вне корзины.
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var cart = $(".cart"); // тут указываем ID элемента
		if (!cart.is(e.target) // если клик был не по нашему блоку
		    && cart.has(e.target).length === 0) { // и не по его дочерним элементам
            cart.removeClass("displayMe");
            $(".photo").removeClass("halfOpacity");
            $(".chosenGood").removeClass("halfOpacity");
		}
	});

    $.ajax({
        type: "GET",
        url: "http://localhost:4000/cart/",
        dateType: "json",
        success: function (good) {

            let $cart = $(".cart");
            $cart.empty();
            $cart.append($('<h2/>').text("Корзина"));
            $.each(good,function(index,value) {
                // Проверка на то, что уже есть такой товар в корзине и нужно просто увеличить его количество
                if($('.cart').children().is('#'+value.goodId)){
                   currentQuantity = parseInt($('.cart').find('#'+value.goodId).children()[0].textContent);
                   $('.cart').find('#'+value.goodId).children()[0].textContent = ++currentQuantity;
                   price = parseInt(value.cost);
                   $('.cart').find('#'+value.goodId).children()[2].textContent = (currentQuantity * price + ' р.');
                   totalSum += price;
               }
               // Такого товара нет, поэтому добовляем
               else {
                   let newProduct = new CartItem(value.title, value.cost, value.goodId, value.id);
                   $cart.append(newProduct.render());
                   totalSum += parseInt(value.cost);
               }
            });
            let sum = new CartItemTotalSum(totalSum);
            $cart.append(sum.render());


            // Обработчики события на нажание "+" или "-" Для увеличение или умельшения количество товаров одного типа
            $('.increase').on('click',function (event) {
                addElement(this.parentElement.parentElement);
            });

            $('.decrease').on('click',function (event) {
                deleteElement(this.parentElement.parentElement.getAttribute("databaseid"));
            });
        }
    });
}

/**
 *
 * @param direction Увеличение или уменьшение общего числа товаров
 */
function changeTotalgoods(direction) {
    if (direction === "increase") {
        totalGoods++;
        $('#goodsCount').text(totalGoods);
    }
    else {
        totalGoods--;
        $('#goodsCount').text(totalGoods);
    }
}

/**
 * Удаление элемента из базы
 * @param element ID элемента для удаления из базы
 */
function deleteElement(element) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:4000/cart/"+element,
        success: function(data) {
            // Уменьщаем число товаров в корзине
            changeTotalgoods("decrease");
            // Переривовываем корзину
            displayCart();
        }
    });
}

/**
 * Добавление товара в базу
 * @param element Элемент на добавление в базу
 */
function addElement(element) {
    title = element.children[1].innerHTML;
    goodId = element.id;
    cost = parseInt(element.children[2].getAttribute("value"));
    $.ajax({
        type: "POST",
        url: "http://localhost:4000/cart",
        contentType: "application/json",
        data: JSON.stringify({
            goodId: goodId,
            title: title,
            cost: cost
        }),
        success: function(data) {
            // Увеличиваем число товаров в корзине
            changeTotalgoods("increase");
            // Переривовываем корзину
            displayCart();
        }
    });
}

/**
 * Отрисовка характеристик актовного товара
 * @param element активный элемент
 */
function showDescription(element) {
    $.ajax({
        type: "GET",
        url: "http://localhost:4000/goods/"+element,
        dateType: "json",
        success: function (good) {

            let $description = $('.choosenGood');
            $description.empty();
            let $header = $('<h3/>');
            $header.attr('id',element);
            $header.text(good.title);

            let $p1 = $('<p/>');
            $p1.attr('id','chair-description');
            $p1.text(good.desc);

            let $p2 = $('<p/>');
            $p2.attr('id','cost');
            $p2.text(good.cost + " p.");

            let $button = $('<button/>');
            $button.attr('id','buy');
            $button.addClass(element);
            $button.text("Добавить в корзину");

            $description.append($header,$p1,$p2,$button);
            showReviewWindow();

            // Обработка нажатия на кнопку "Купить"
            $('.choosenGood').on('click','#buy.'+element,function(event) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:4000/cart",
                    contentType: "application/json",
                    data: JSON.stringify({
                        goodId: element,
                        title: good.title,
                        cost: good.cost
                    }),
                    success: function(data) {
                        changeTotalgoods("increase");
                    }
                });
            })


        }
    });
}

/**
 * Отрисовка окошка для отправки отзыва о товаре
 */
function showReviewWindow() {
    let $description = $('.choosenGood');
    let $form = $('<form/>');

    let $label = $('<label/>');
    $label.attr("for","userName");
    $label.text("Ваше Имя");
    let $input = $('<input/>').attr("id","userName");
    $input.attr("placeholder", "Иван");

    let $labelText = $('<label/>');
    $labelText.attr("for","userTextarea");
    $labelText.text("Отзыв");
    let $inputText = $('<textarea/>').attr("id","userTextarea");
    $inputText.attr("placeholder", "Текст вашего отзыва");

    let $button = $('<button/>').addClass("button sendReview");
    $button.text("Отправить");
    $button.attr("type", "button");

    $form.append($label,$input,$labelText, $inputText, $button);
    $description.append($form);

    // Обработка нажатия на кнопку "Отправить"
    $('.sendReview').on('click', function(event) {
        // Только если Имя пользователя прошло валидацию
        if(formValidation()) {
            $.ajax({
                type: "POST",
                url: "http://localhost:4000/review",
                contentType: "application/json",
                data: JSON.stringify({
                    name: $("#userName")[0].value,
                    text: $("#userTextarea")[0].value,
                    approve: false
                }),
                success: function(data) {
                    $input[0].value = '';
                    $inputText[0].value = '';
                    // Чистим отрисовку всех отзывов
                    $('.reviewBeforeApproval').empty();
                    // Отрисовываем все отзывы снова
                    sentForApprovalReviews()
                }
            });
        }
    });
}

/**
 * Отрисовка всез отзывов
 */
function sentForApprovalReviews() {
    let $reviewBeforeApproval = $('.reviewBeforeApproval');
    $reviewBeforeApproval.empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:4000/review",
        dateType: "json",
        success: function (reviews) {

            reviews.forEach(function (review) {
                let reviewItem = new ReviewItem(review.name, review.text, review.id, review.approve);
                $reviewBeforeApproval.append(reviewItem.render());
            });

            // Оброаботка назатия на кнопки "SEND" и "DELL"
            $('.denied').on('click', function(event) {
                deniedReviewItem(this.parentElement.parentElement.getAttribute("databaseid"));
            })
            $('.approve').on('click', function(event) {
                approveReviewItem(this.parentElement.parentElement);
            })
        }
    });
}

/**
 *
 * @param review ID элемента на удаление из базы
 */
function deniedReviewItem(review) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:4000/review/"+review,
        success: function(data) {
            // Перерисовка всех отзывов сначала
            sentForApprovalReviews();
        }
    });
}

/**
 *
 * @param review Этемент на добовление в заапрувленные отзывы
 */
function approveReviewItem(review) {
    $.ajax({
        type: "POST",
        url: "http://localhost:4000/review",
        contentType: "application/json",
        data: JSON.stringify({
            name: review.children[1].textContent,
            text: review.children[2].textContent,
            approve: true,
        }),
        success: function (data) {
            // Добавляем такой же отзыв с измененный параметром "approve"==true, а после сразу же удалем текущий
            // Получилась некая замена модифаю.
            deniedReviewItem(review.getAttribute("databaseid"));
        },
        error: function () {
            console.log("Ошибка при апруве отзыва");
        }
    });
}

/**
 *
 * @returns {boolean} Проверка, что в поле Имя были введелы сомволы удовлетворяющие паттерну.
 */
function formValidation() {
    let nameRegexp = /^[a-zA-Zа-яА-Я0-9]{1,20}$/;
    let name = $("#userName");
    let nameRegExpValue = name[0].value.match(nameRegexp);
    if (nameRegExpValue === null) {
        name.addClass("validation-fail");
        alert("Неверное имя\nДопустимы только русские и английские буквы обоих регистров, а так же цифры\nДлина имени от 1 до 20 символов");
        return false;
    } else {
        name.removeClass("validation-fail");
        return true;
    }
}
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