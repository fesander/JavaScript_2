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

