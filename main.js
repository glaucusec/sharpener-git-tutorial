let form = document.querySelector('#my-form');
form.addEventListener('submit', saveItems);

function saveItems(e) {
    e.preventDefault();
    
    fName = document.getElementById('name').value;
    fEmail = document.getElementById('email').value;

    userDetails = {
        'userName': fName,
        'userEmail': fEmail 
    };

    // converting object & storing as string
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // accessing and converting back string to object
    let deSerialized = JSON.parse(localStorage.getItem('userDetails'));
    console.log(deSerialized); 
}