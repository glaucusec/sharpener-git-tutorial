const formEl = document.querySelector('#product-form');

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const { result } = axios.post('http://localhost:3000', document.querySelector('#product-form'), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(window.location.href = 'http://localhost:3000');
})

const electronicsBody = document.querySelector('.t1');
const foodBody = document.querySelector('.t2');
const skincareBody = document.querySelector('.t3');

function addProductToScreen(product) {
    const tr = document.createElement('tr');

    const tdName = document.createElement('td');
    tdName.textContent = product.name;

    const tdPrice = document.createElement('td');
    tdPrice.textContent = product.price

    const tdCategory = document.createElement('td');
    tdCategory.textContent = product.category;

    const tdDelete = document.createElement('td');
    const delBtn = document.createElement('input');
    delBtn.type = 'button';
    delBtn.value = 'Delete';
    delBtn.classList.add('btn', 'btn-danger');
    delBtn.onclick = () => {
        let prodId = product.id;
        axios.delete('/delete', {
            data: {
                id: prodId
            }
        })
        .then(window.location.href = 'http://localhost:3000')
        .catch(err => console.log(err));
    }
    tdDelete.appendChild(delBtn);


    tr.appendChild(tdName);
    tr.appendChild(tdPrice);
    tr.appendChild(tdCategory);
    tr.appendChild(tdDelete);

    if( product.category == 'electronics' ) {
        electronicsBody.append(tr);
    } else if ( product.category == 'food' ) {
        foodBody.append(tr);
    } else if ( product.category == 'skincare' ) {
        skincareBody.append(tr);
    }
}


async function fetchProducts() {
    let response = await axios.get('http://localhost:3000/products');
    let data = response.data;
    data.forEach(product => {
        addProductToScreen(product);
    });
}

fetchProducts();