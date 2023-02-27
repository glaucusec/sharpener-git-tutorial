let form = document.querySelector('#my-form');
let itemList = document.querySelector('#items');
form.addEventListener('submit', saveItems);

function saveItems(e) {
    e.preventDefault();

    fName = document.getElementById('name').value;
    fEmail = document.getElementById('email').value;
    fPhone = document.getElementById('phone').value;


    userDetails = {
        'userName': fName,
        'userEmail': fEmail,
        'userPhone': fPhone
    };

    // converting object & storing as string
    localStorage.setItem(fEmail, JSON.stringify(userDetails));

    newLi = document.createElement('li');
    newLi.appendChild(document.createTextNode(fName
        + ' - ' + fEmail + ' - ' + fPhone));
    itemList.appendChild(newLi);
}