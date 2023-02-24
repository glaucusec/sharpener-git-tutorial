// traversing the dom
let itemList = document.querySelector('#items');
// parentNode
// console.log(itemList.parentNode);
// itemList.parentNode.style.backgroundColor = "#f4f4f4";
// console.log(itemList.parentNode.parentNode.parentNode);

// parentElement
// console.log(itemList.parentElement);
// itemList.parentElement.style.backgroundColor = "#f4f4f4";
// console.log(itemList.parentElement.parentElement.parentElement);


// childNodes
// console.log(itemList.childNodes);

// children
// console.log(itemList.children);
// console.log(itemList.children[1]);
// itemList.children[1].style.backgroundColor = "yellow";

// firstChild
// console.log(itemList.firstElementChild.textContent);
// itemList.firstElementChild.textContent = "Hellooo 1";

// lastChild
// itemList.lastElementChild.textContent = "BYEEE 1"

// siblings
// console.log(itemList.nextElementSibling)

// previosSibling
// console.log(itemList.previousElementSibling);
// itemList.previousElementSibling.style.color = "green";

// createElement
// create a div
let newDiv = document.createElement('div');
// add class
newDiv.className = "hello";
// add id
newDiv.id = "hello1";
// add attr
newDiv.setAttribute('title', 'Hello Div')
// create a text node
let newDivText = document.createTextNode('Hello World');
// add text to div
newDiv.appendChild(newDivText);

let container = document.querySelector('header .container');
let h1 = document.querySelector('header h1');

newDiv.style.fontSize = '20px';
// adding before ItemLister
container.insertBefore(newDiv, h1);

// adding before item1
let item1 = document.querySelector("#items");
let item2 = document.querySelector(".container ul").children[0];

item1.insertBefore(newDiv, item2);