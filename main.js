const form = document.querySelector('#my-form');
const itemList = document.querySelector('#items');

// function to add user to the screen
function addUserToScreen(obj) {
  const newLi = document.createElement('li');
  newLi.textContent = `${obj.userName} - ${obj.userEmail} - ${obj.userPhone}`;

  const delBtn = document.createElement('input');
  delBtn.type = 'button';
  delBtn.value = 'Delete';
  delBtn.onclick = () => {
    axios.delete(`https://crudcrud.com/api/8bfba5b0416e491e947ed1fb60b74b05/userdetails/${obj._id}`)
      .then(() => {
        itemList.removeChild(newLi);
      })
      .catch((err) => console.log(err));
  };

  const editBtn = document.createElement('input');
  editBtn.type = 'button';
  editBtn.value = 'Edit';
  editBtn.onclick = () => {
    document.getElementById('name').value = obj.userName;
    document.getElementById('email').value = obj.userEmail;
    document.getElementById('phone').value = obj.userPhone;
    itemList.removeChild(newLi);
  };

  newLi.appendChild(delBtn);
  newLi.appendChild(editBtn);
  itemList.appendChild(newLi);
}

// function to fetch and display existing users
function showExistingUsers() {
  axios.get('https://crudcrud.com/api/8bfba5b0416e491e947ed1fb60b74b05/userdetails')
    .then((response) => {
      const data = response.data;
      data.forEach((obj) => {
        addUserToScreen(obj);
      });
    })
    .catch((error) => console.log(error));
}

// function to add new user
function addNewUser() {
  const fName = document.getElementById('name').value;
  const fEmail = document.getElementById('email').value;
  const fPhone = document.getElementById('phone').value;

  const userDetails = {
    'userName': fName,
    'userEmail': fEmail,
    'userPhone': fPhone
  };

  axios.post('https://crudcrud.com/api/8bfba5b0416e491e947ed1fb60b74b05/userdetails', userDetails)
    .then((response) => {
      const newObj = response.data;
      addUserToScreen(newObj);
    })
    .catch((err) => console.log(err));
}

// add event listener to form
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addNewUser();
});

// show existing users on page load
showExistingUsers();
