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
        showBigImage();

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

function showDescription(element) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/goods/"+element,
        dateType: "json",
        success: function (good) {

            let $description = $('.description');
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
            $button.text("Добавить в корзину");

            $description.append($header,$p1,$p2,$button);

        }
    });
}