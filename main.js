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
    axios.post('https://crudcrud.com/api/8bfba5b0416e491e947ed1fb60b74b05/userdetails', userDetails)
        .then((response) => console.log(response))
        .catch((err) => console.log(err))

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
        itemList.removeChild(newLi);
    }

    let editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = "Edit";
    editBtn.onclick = () => {
        document.getElementById('name').value = obj.userName;
        document.getElementById('email').value = obj.userEmail;
        document.getElementById('phone').value = obj.userPhone;
        itemList.removeChild(newLi);
    }
    
    newLi.appendChild(delBtn);
    newLi.appendChild(editBtn);
    itemList.appendChild(newLi);
}

function showDefault() {
    const itemList = document.querySelector('#items');
    
    axios.get('https://crudcrud.com/api/8bfba5b0416e491e947ed1fb60b74b05/userdetails')
        .then((response) => {
            data = response.data;
            for(let i=0;i<data.length;i++) {
                obj = data[i];
                let newLi = document.createElement('li');
                newLi.textContent = obj.userName+' - '+obj.userEmail+ ' - ' + obj.userPhone;
                let delBtn = document.createElement('input');
                    delBtn.type = 'button';
                    delBtn.value = "Delete";
                    delBtn.onclick = () => {
                        itemList.removeChild(newLi);
                    }
                let editBtn = document.createElement('input');
                editBtn.type = 'button';
                editBtn.value = "Edit";
                editBtn.onclick = () => {
                    document.getElementById('name').value = obj.userName;
                    document.getElementById('email').value = obj.userEmail;
                    document.getElementById('phone').value = obj.userPhone;
                    itemList.removeChild(newLi);
                }
                newLi.appendChild(delBtn);
                newLi.appendChild(editBtn);
                itemList.appendChild(newLi);
            }
        })
    .catch((error) => console.log(error));
}

showDefault();