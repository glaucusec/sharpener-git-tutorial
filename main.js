let form = document.querySelector('#my-form');
form.addEventListener('submit', saveItems);

function saveItems(e) {
    fName = document.getElementById('name').value;
    fEmail = document.getElementById('email').value;

    localStorage.setItem('name' ,fName);
    localStorage.setItem('email', fEmail);
}