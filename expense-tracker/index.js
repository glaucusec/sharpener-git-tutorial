let form = document.querySelector("#expense-form");

form.addEventListener('submit', saveItems);

function saveItems(e) {
    e.preventDefault();
    let Amount = document.getElementById('amountInputBox').value;
    let Description = document.getElementById('descInputBox').value;
    let Category = document.getElementById('catInputBox').value;

    expense = {
        amount: Amount,
        desc: Description,
        category: Category
    }

    localStorage.setItem(Description, JSON.stringify(expense));
    showUserOnScreen();

}

function showUserOnScreen() {
    document.querySelector('#items').innerHTML = "";
    for (const key in localStorage) {
        if(localStorage.hasOwnProperty(key)){
            let currKeyItem = JSON.parse(localStorage.getItem(key));

            const itemList = document.querySelector('#items');
            let newLi = document.createElement('li');
            newLi.textContent = currKeyItem.amount + ' - ' +
                currKeyItem.desc + ' - ' + currKeyItem.category;

            // Adding delete button
            let delBtn = document.createElement('input');
            delBtn.type = 'button';
            delBtn.value = 'Delete';
            delBtn.classList = 'btn btn-outline-danger btn-sm m-2';
            delBtn.onclick = () => {
                localStorage.removeItem(currKeyItem.desc);
                itemList.removeChild(newLi);
            }

            // Adding Edit Button
            let editBtn = document.createElement('input');
            editBtn.type = 'button';
            editBtn.value = "Edit";
            editBtn.classList = 'btn btn-outline-secondary btn-sm m-2';
            editBtn.onclick = () => {
                document.getElementById('amountInputBox').value = currKeyItem.amount;
                document.getElementById('descInputBox').value = currKeyItem.desc;
                document.getElementById('catInputBox').value = currKeyItem.category;

                localStorage.removeItem(currKeyItem.desc);
                itemList.removeChild(newLi);
            }

            newLi.appendChild(editBtn);
            newLi.appendChild(delBtn);
            itemList.appendChild(newLi);
        }
      }

}

showUserOnScreen();