/*
* описания классов
*/
function Container()
{
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function()
{
   return this.htmlCode;
}

function Basket(){
	Container.call(this);
	this.id = "basket";
	this.count_goods = 0;
	this.amount = 0;
	
	this.basket_items = [];
	this.collectBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function(recipient){
	var basket_div = $('<div/>', {
		id: this.id,
		text: 'Корзина'
	});
	
	var basket_items_div = $('<div/>', {
		id: this.id + "_items",
	});
	
	basket_items_div.appendTo(basket_div);
	basket_div.appendTo(recipient);
}

Basket.prototype.collectBasketItems = function(){

	return this.basket_items;
}

Basket.prototype.add = function(id_product, quantity, price){
	// TODO переделать на AJAX
	var basket_item = {
		"id_product" : id_product,
        "price" : price
	}
	
	for(var i = 1; i <= quantity; i++){
		this.count_goods++;
	}
	
	this.amount += price;
	
	this.basket_items.push(basket_item);
	this.refresh();
}

Basket.prototype.refresh = function(){
	//TODO переделать на AJAX
	var basket_data_div = $('#basket_data');
	
	basket_data_div.empty();
	basket_data_div.append("<p>Всего товаров : " + this.count_goods + "</p>");
	basket_data_div.append("<p>Сумма : " + this.amount + "</p>");
}

