let script = document.createElement('script');
script.src = '../Lesson_1/menu.js';
document.getElementsByTagName('head')[0].appendChild(script);
alert('script loaded');

console.log("The second homework begins");

let my_items;
function fullMenuContent(xhr) {
    my_items = [];

    if(xhr.readyState === 4) {
        if(xhr.status === 0) {
            let items = JSON.parse(xhr.responseText);

            for(let  i = 0; i < items.menu_items.length; i++)
                my_items[i] = new MenuItem(items.menu_items[i].id, items.menu_items[i].href, items.menu_items[i].title);

            let menu = new Menu('menu', 'menu', my_items);
            document.body.appendChild(menu.render());
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
        console.log("Error");
    }
}