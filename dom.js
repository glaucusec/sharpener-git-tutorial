var form  = document.getElementById('addForm');
let itemList = document.getElementById('items');
let filter = document.getElementById('filter');

// form submit event
form.addEventListener('submit', addItem);
// Delete event
itemList.addEventListener('click', removeItem);
// filter event
filter.addEventListener('keyup', filterItems);

// addItem function
function addItem(e) {
    e.preventDefault();

    // get the input value
    let newItem = document.getElementById('item').value;
    // create new li element
    let li = document.createElement('li');
    // add class
    li.className = 'list-group-item';
    // Add textnode with input value
    li.appendChild(document.createTextNode(newItem));

    // create the delte button element
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    // append text node
    deleteBtn.appendChild(document.createTextNode('X'));
    // append button to li
    li.appendChild(deleteBtn);

    // append li to list
    itemList.appendChild(li);
}

function removeItem(e) {
    if(e.target.classList.contains('delete')) {
        if(confirm("Are you sure?")) {
            let li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}

function filterItems(e) {
    // convert text to lowercase
    let text = e.target.value.toLowerCase();
    // get lists
    let items = itemList.getElementsByTagName('li');
    // conver to an array
    Array.from(items).forEach(function(item) {
        let itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
}