'use strict';

describe("Тестирование класса Container",function () {
    let c = new Container();
    it("Проверка создания дефолтного объекта Container", function () {
        expect(c.className).toBe("container");
        expect(c.id).toBe("container");
    });

    it("Проверка, что метод render возвращает правильные значения", function () {
        expect(c.render().id).toBe("container");
        expect(c.render().className).toBe("container");
    });
});

describe("Тестирование класса GoodItem",function () {
    it("Проверка создания дефолтного объекта GoodItem",function () {
        let c = new GoodItem();
        expect(c.className).toBe(undefined);
        expect(c.id).toBe(undefined);
        expect(c.link).toBe("images/undefined.jpg");
    });

    it("Проверка создания объекта GoodItem c параметрами", function () {
        let c = new GoodItem('good_1','goods_class');
        expect(c.className).toBe("goods_class");
        expect(c.id).toBe("good_1");
        expect(c.link).toBe("images/good_1.jpg");
    });

    it("Проверка, что метод render возвращает правильные значения", function () {
        let c = new GoodItem('good_1','goods_class');
        expect(c.render()[0].id).toBe("good_1");
        expect(c.render()[0].className).toBe("goods_class");
        expect(c.render()[0].style.backgroundImage).toBe('url("images/good_1.jpg")');
    });
});

describe("Тестирование класса CartItem",function () {
    it("Проверка создания дефолтного объекта CartItem",function () {
        let c = new CartItem();
        expect(c.id).toBe(undefined);
        expect(c.name).toBe(undefined);
        expect(c.cost).toBe(undefined);
        expect(c.dbID).toBe(undefined);
    });

    it("Проверка создания объекта CartItem c параметрами", function () {
        let c = new CartItem('good_1',100,1,'db_1');
        expect(c.name).toBe("good_1");
        expect(c.cost).toBe(100);
        expect(c.id).toBe(1);
        expect(c.dbID).toBe('db_1');
    });

    it("Проверка, что метод render возвращает правильные значения", function () {
        let c = new CartItem('good_1',100,1,'db_1');
        expect(c.render().children()[0].className).toBe('number');
        expect(c.render().children()[1].className).toBe('product');
        expect(c.render().children()[2].className).toBe('sum');
        expect(c.render().children()[3].className).toBe('quantityManging');
    });
});


	// var a = {x:9,y:8};
	// var b = {x:9,y:8};
    //
	// var c = null;
    //
	// it("Проверка ожидания", function() {
	// 	expect(1+2).toBe(3);
	// });
	// it("Не соответствует", function() {
	// 	expect(1+2).not.toBe(4);
	// });
	// it("Эквивалентен", function() {
	// 	expect(a).toEqual(b);
	// });
	// it("Определен", function() {
	// 	expect(window.document).toBeDefined();
	// });
	// it("Не существует", function() {
	// 	expect(window.notExists).toBeUndefined();
	// });
	// it("Дложна быть null", function() {
	// 	expect(c).toBeNull();
	// });
	// it("Дложна быть true", function() {
	// 	expect(true).toBeTruthy();
	// });
	// it("Дложна быть flse", function() {
	// 	expect(false).toBeFalsy();
	// });
	// it("Меньше чем 5", function() {
	// 	expect(1+2).toBeLessThan(5);
	// });
	// it("Больше чем 2", function() {
	// 	expect(1+2).toBeGreaterThan(2);
	// });
    //
	// it("Приблизительно равно", function() {
	// 	expect(0.1+0.2).toBeCloseTo(0.3);
	// });
	// it("Регулярное значение", function() {
	// 	expect("some string").toMatch(/string/);
	// });
    //
	// it("Содержит", function() {
	// 	expect("some string").toContain("string");
	// });



// describe("Тесты корзины",function () {
	// var basket = new Basket();
    //
	// basket.basket_items = [
	// 	{
	// 		"id_product":123,
	// 		"price":100
	// 	}
	// ];
    //
	// it("Наполнение корзины", function () {
	// 	expect(basket.basket_items.length).toBe(1);
	// });
	// it("Функция наполнения", function () {
	// 	expect(basket.collectBasketItems()).toEqual([
	// 		{
	// 			"id_product":123,
	// 			"price":100
	// 		}
	// 	]);
	// });
    //
	// it("Функция add", function () {
	// 	basket.add("122",1,100);
    //
	// 	expect(basket.count_goods).toBe(1);
	// 	expect(basket.amount).toBe(100);
    //
	// 	basket.add("122",2,300);
    //
	// 	expect(basket.count_goods).toBe(3);
	// 	expect(basket.amount).toBe(400);
	// });
// });