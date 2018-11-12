function Container(){
	this.id = "";
	this.className = "";
	this.htmlCode = "";
}

Container.prototype.render = function(){
	return this.htmlCode;
}

Container.prototype.remove = function() {
    document.getElementById(this.id).remove();
}

function Menu(my_id, my_class, my_items){
	Container.call(this);
	this.id = my_id;
	this.className = my_class;
	this.items = my_items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function(){
	let ul = document.createElement('ul');
    ul.className = this.className;
    ul.id = this.id;

	for (var item in this.items){
		if(this.items[item] instanceof MenuItem || this.items[item] instanceof Submenu){
            ul.appendChild(this.items[item].render());
		}
	}
	return ul;
}

function Submenu(my_href, my_name, my_id, my_items) {
    Menu.call(this);
	this.href = my_href;
	this.itemName = my_name;
    this.id = my_id;
	this.items = my_items;
}

Submenu.prototype.render = function() {
    let li = document.createElement('li');
    li.id = this.id;
    let a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.itemName;
    li.appendChild(a);
    let ul = document.createElement('ul');

    for (var item in this.items) {
        console.log(this.items[item]);
        if (this.items[item] instanceof MenuItem ) {
            ul.appendChild(this.items[item].render());
        }
    }
    li.appendChild(ul);
    return li;
}

function MenuItem(my_id, my_href, my_name){
	Container.call(this);
    this.id = my_id;
	this.className = "menu-item";
	this.href = my_href;
	this.itemName = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function(){
    let li = document.createElement('li');
    li.id = this.id;
    let a = document.createElement('a');
    a.href = this.href;
    a.textContent = this.itemName;
    li.appendChild(a);
    return li;
}
