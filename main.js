let form = document.querySelector('#my-form');

form.addEventListener('submit', saveItems);
// itemList.addEventListener('click', removeItem);

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
    showUserOnScreen(userDetails);
}  
function showUserOnScreen(obj) { 
    const itemList = document.querySelector('#items');
    let newLi = document.createElement('li');
    newLi.textContent = obj.userName+' - '+obj.userEmail+ ' - ' + obj.userPhone;

    let delBtn = document.createElement('input');
    delBtn.type = 'button';
    delBtn.value = "Delete";
    delBtn.onclick = () => {
        localStorage.removeItem(obj.userEmail);
        itemList.removeChild(newLi);
    }

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = "Edit";
    editBtn.onclick = () => {
        document.getElementById('name').value = obj.userName;
        document.getElementById('email').value = obj.userEmail;
        document.getElementById('phone').value = obj.userPhone;

        localStorage.removeItem(obj.userEmail);
        itemList.removeChild(newLi);
    }
    
    newLi.appendChild(delBtn);
    newLi.appendChild(editBtn);
    itemList.appendChild(newLi);
}

