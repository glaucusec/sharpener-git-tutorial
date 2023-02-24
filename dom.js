// getelementbyId

// let headerTitle = document.getElementById('header-title');
let header = document.getElementById('main-header');
header.style.borderBottom = 'solid 3px black' 

// getElementByClassName

// let items = document.getElementsByClassName('list-group-item');

// console.log(items[1].textContent);
// items[1].textContent = "hello"
// items[1].style.fontWeight = 'bold';
// items[1].style.backgroundColor = 'yellow';

// // items[2].style.backgroundColor = '#f4f4f4';

// for(let i=0;i<items.length;i++){
//     items[i].style.backgroundColor = '#f4f4f4';
// }


// getElementByTagName

let li = document.getElementsByTagName('li');

console.log(li);
li[1].textContent = "hello"
li[1].style.fontWeight = 'bold';
li[1].style.backgroundColor = 'yellow';

// items[2].style.backgroundColor = '#f4f4f4';

for(let i=0;i<li.length;i++){
    li[i].style.backgroundColor = '#f4f4f4';
}

// make add items bold and color green
let h2 = document.querySelector('h2');
h2.style.fontWeight = 'bold';
h2.style.color = 'green';

var input = document.querySelector('input');
input.value = "Hello World";

let submit = document.querySelector('input[type="submit"]')
submit.value = "SEND"


