
// let headerTitle = document.getElementById('header-title');
let header = document.getElementById('main-header');
header.style.borderBottom = 'solid 3px black' 

let items = document.getElementsByClassName('list-group-item');

console.log(items);
items[2].style.backgroundColor = 'green';
items[1].style.fontWeight = 'bold';

for(let i=0;i<items.length;i++){
    items[i].style.fontWeight = 'bold';
}

// task #5
withoutClass = document.getElementsByClassName("without-class")[0];
withoutClass.innerText = "This is the Item #5";