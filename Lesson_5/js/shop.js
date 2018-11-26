let totalGoods = 0;

function getInitialGoodsInCart() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/cart/",
        dateType: "json",
        success: function (good) {
            totalGoods = good.length;
            $('#goodsCount').text(totalGoods);
        }
    });
}


$.ajax({
    type: "GET",
    url: "http://localhost:3000/goods",
    dateType: "json",
    success: function (goods) {

        let $smallImages = $('.small');
        goods.forEach(function (good) {
            let img = new GoodItem(good.id, good.class);
            $smallImages.append(img.render());
        });
        
        $('#cartIcon').on('click', function (event) {
            displayCart();
        });

        getInitialGoodsInCart();
        showBigImage();
        sentForApprovalReviews();

        $('#goodsCount').text(totalGoods);

        $('.arrow').on('click',function (event) {
            let currentElement = goods.find(x => x.id == $('.active').attr('id'));
            let indexNumber = goods.indexOf(currentElement);
            let nextElementId;
            $('.active').removeClass('active');
            if(indexNumber === 0 && this.id === 'arrow-left')
                nextElementId = goods[goods.length-1].id;
            else if (indexNumber === goods.length-1 && this.id === 'arrow-right')
                nextElementId = goods[0].id;
            else if (this.id === 'arrow-left')
                nextElementId = goods[indexNumber-1].id;
            else if (this.id === 'arrow-right')
                nextElementId = goods[indexNumber+1].id;
            $('#'+nextElementId).addClass('active');
            showBigImage();
        });

        $('.chair').on('click',function (event) {
            $('.active').removeClass('active');
            $(this).addClass('active');
            console.log(goods.indexOf(this));
            showBigImage();
        });
    }
});

function showBigImage() {
    let $activeElement = $('.active').attr('id');
    let $bigImage = "images/"+$activeElement+".jpg";
    $('#big').attr("style","background-image: url('" + $bigImage + "')");
    showDescription($activeElement);
}

function displayCart() {
    console.log("show Cart");
    let totalSum = 0;
    $(".photo").addClass("halfOpacity");
    $(".chosenGood").addClass("halfOpacity");
    $(".cart").addClass("displayMe");
    // $(".cart").show();
    
    // Закрытие корзины при клике вне корзины.
	$(document).mouseup(function (e){ // событие клика по веб-документу
		var cart = $(".cart"); // тут указываем ID элемента
		if (!cart.is(e.target) // если клик был не по нашему блоку
		    && cart.has(e.target).length === 0) { // и не по его дочерним элементам
			// cart.hide(); // скрываем его
            cart.removeClass("displayMe");
            $(".photo").removeClass("halfOpacity");
            $(".chosenGood").removeClass("halfOpacity");
		}
	});

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/cart/",
        dateType: "json",
        success: function (good) {

            let $cart = $(".cart");
            $cart.empty();
            $cart.append($('<h2/>').text("Корзина"));
            $.each(good,function(index,value) {
               if($('.cart').children().is('#'+value.goodId)){
                   currentQuantity = parseInt($('.cart').find('#'+value.goodId).children()[0].textContent);
                   $('.cart').find('#'+value.goodId).children()[0].textContent = ++currentQuantity;
                   price = parseInt(value.cost);
                   $('.cart').find('#'+value.goodId).children()[2].textContent = (currentQuantity * price + ' р.');
                   totalSum += price;
               }
               else {
                   let newProduct = new CartItem(value.title, value.cost, value.goodId, value.id);
                   $cart.append(newProduct.render());
                   totalSum += parseInt(value.cost);
               }
            });
            let sum = new CartItemTotalSum(totalSum);
            $cart.append(sum.render());


            $('.increase').on('click',function (event) {
                addElement(this.parentElement.parentElement);
            });

            $('.decrease').on('click',function (event) {
                deleteElement(this.parentElement.parentElement.getAttribute("databaseid"));
            });
        }
    });
}

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

function deleteElement(element) {
    console.log("Minus element " + element);
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/cart/"+element,
        success: function(data) {
            console.log(data);
            changeTotalgoods("decrease");
            displayCart();
        }
    });
}

function addElement(element) {
    title = element.children[1].innerHTML;
    goodId = element.id;
    cost = parseInt(element.children[2].getAttribute("value"));
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/cart",
        contentType: "application/json",
        data: JSON.stringify({
            goodId: goodId,
            title: title,
            cost: cost
        }),
        success: function(data) {
            console.log(data);
            changeTotalgoods("increase");
            displayCart();
        }
    });
}

function showDescription(element) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/goods/"+element,
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
            
            $('.choosenGood').on('click','#buy.'+element,function(event) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/cart",
                    contentType: "application/json",
                    data: JSON.stringify({
                        goodId: element,
                        title: good.title,
                        cost: good.cost
                    }),
                    success: function(data) {
                        console.log(data);
                        changeTotalgoods("increase");
                    }
                });
            })


        }
    });
}

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

    $('.sendReview').on('click', function(event) {
        if(formValidation()) {
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/review",
                contentType: "application/json",
                data: JSON.stringify({
                    name: $("#userName")[0].value,
                    text: $("#userTextarea")[0].value,
                    approve: false
                }),
                success: function(data) {
                    console.log(data);
                    $input[0].value = '';
                    $inputText[0].value = '';
                    $('.reviewBeforeApproval').empty();
                    sentForApprovalReviews()
                }
            });
        }
    });
}

function sentForApprovalReviews() {
    let $reviewBeforeApproval = $('.reviewBeforeApproval');
    $reviewBeforeApproval.empty();

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/review",
        dateType: "json",
        success: function (reviews) {

            reviews.forEach(function (review) {
                let reviewItem = new ReviewItem(review.name, review.text, review.id, review.approve);
                $reviewBeforeApproval.append(reviewItem.render());
            });

            $('.denied').on('click', function(event) {
                deniedReviewItem(this.parentElement.parentElement.getAttribute("databaseid"));
            })
            $('.approve').on('click', function(event) {
                approveReviewItem(this.parentElement.parentElement);
            })
        }
    });
}

function deniedReviewItem(review) {
    console.log("Delete review Item " + review);
    $.ajax({
        type: "DELETE",
        url: "http://localhost:3000/review/"+review,
        success: function(data) {
            console.log(data);
            sentForApprovalReviews();
        }
    });
}

function approveReviewItem(review) {
    console.log("Approved");

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/review",
        contentType: "application/json",
        data: JSON.stringify({
            name: review.children[1].textContent,
            text: review.children[2].textContent,
            approve: true,
        }),
        success: function (data) {
            console.log(data);
            deniedReviewItem(review.getAttribute("databaseid"));
        },
        error: function () {
            console.log("Ошибка при апруве отзыва");
        }
    });
}

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