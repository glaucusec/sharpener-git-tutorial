
// let headerTitle = document.getElementById('header-title');
let header = document.getElementById('main-header');
header.style.borderBottom = 'solid 3px black' 

let items = document.getElementsByClassName('list-group-item');

console.log(items);

// task 6
// deliverable
items[1].style.backgroundColor = 'green';
items[2].style.visibility = "hidden";

// deliverable
let item = document.querySelectorAll('.list-group-item');
item[1].style.color = "#90EE90";


let odd = document.querySelectorAll('li:nth-child(odd)');
for (let i=0;i<odd.length;i++) {
    odd[i].style.backgroundColor = 'green';
}