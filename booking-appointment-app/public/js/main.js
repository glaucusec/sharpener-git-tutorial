
// Sending the form data to backend
const formEl = document.querySelector('#form');

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData);
    
    try {
        const response = await fetch('http://localhost:3000', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(response.ok) {
            window.location.href = 'http://localhost:3000';
        } else {
            console.error("Server Error :", response.status);
        }
    } catch (error) {
        console.log(error);
    }
});

// Showing the users on the screen.
const itemList = document.querySelector('#items');

function addUserToScreen(user) {
    const newLi = document.createElement('li');
    newLi.textContent = `${user.id} - ${user.username} - ${user.phone} - ${user.email}`;

    // Adding the Delete button
    const delBtn = document.createElement('input');
    delBtn.type = 'button';
    delBtn.value = 'Delete';
    delBtn.classList.add('btn', 'btn-danger');
    delBtn.onclick = async () => {
        user_id = {'id': user.id}
        try {
            const response = await fetch('http://localhost:3000/delete-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user_id)
            })
            if(response.ok) {
                window.location.href = 'http://localhost:3000';
            } else {
                console.error("Server Error :", response.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Adding the Edit button
    const editBtn = document.createElement('input');
    editBtn.type = 'button';
    editBtn.value = 'Edit';
    editBtn.classList.add('btn', 'btn-warning');
    editBtn.onclick = () => {
        document.getElementById('id').value = user.id;
        document.getElementById('username').value = user.username;
        document.getElementById('phone').value = user.phone;
        document.getElementById('email').value = user.email;
    }

    newLi.appendChild(editBtn);
    newLi.appendChild(delBtn);
    itemList.appendChild(newLi);
}


async function fetchUsers() {
    let response = await fetch('http://localhost:3000/users');
    let data = await response.json();
    if(data) {
        data.forEach(user => {
        addUserToScreen(user)
    });
    }
}

fetchUsers();

