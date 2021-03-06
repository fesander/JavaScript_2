'use strict';

describe("Набор тестов",function () {
	var a = {x:9,y:8};
	var b = {x:9,y:8};

	var c = null;

	it("Проверка ожидания", function() {
		expect(1+2).toBe(3);
	});
	it("Не соответствует", function() {
		expect(1+2).not.toBe(4);
	});
	it("Эквивалентен", function() {
		expect(a).toEqual(b);
	});
	it("Определен", function() {
		expect(window.document).toBeDefined();
	});
	it("Не существует", function() {
		expect(window.notExists).toBeUndefined();
	});
	it("Дложна быть null", function() {
		expect(c).toBeNull();
	});
	it("Дложна быть true", function() {
		expect(true).toBeTruthy();
	});
	it("Дложна быть flse", function() {
		expect(false).toBeFalsy();
	});
	it("Меньше чем 5", function() {
		expect(1+2).toBeLessThan(5);
	});
	it("Больше чем 2", function() {
		expect(1+2).toBeGreaterThan(2);
	});

	it("Приблизительно равно", function() {
		expect(0.1+0.2).toBeCloseTo(0.3);
	});
	it("Регулярное значение", function() {
		expect("some string").toMatch(/string/);
	});

	it("Содержит", function() {
		expect("some string").toContain("string");
	});
});


describe("Тесты корзины",function () {
	var basket = new Basket();

	basket.basket_items = [
		{
			"id_product":123,
			"price":100
		}
	];

	it("Наполнение корзины", function () {
		expect(basket.basket_items.length).toBe(1);
	});
	it("Функция наполнения", function () {
		expect(basket.collectBasketItems()).toEqual([
			{
				"id_product":123,
				"price":100
			}
		]);
	});

	it("Функция add", function () {
		basket.add("122",1,100);

		expect(basket.count_goods).toBe(1);
		expect(basket.amount).toBe(100);

		basket.add("122",2,300);

		expect(basket.count_goods).toBe(3);
		expect(basket.amount).toBe(400);
	});
});