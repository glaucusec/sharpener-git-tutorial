const form = document.getElementById('my-form')
table1 = document.getElementById('table1');
table2 = document.getElementById('table2');
table3 = document.getElementById('table3');

function addExistingData(newObj) {
	const newLi = document.createElement('li');
  newLi.textContent = `${newObj.price} - ${newObj.Dish} - ${newObj.tableName}`;
  
  const delBtn = document.createElement('input');
  delBtn.type = 'button';
  delBtn.value = 'Delete';

	if(newObj.tableName == 'Table 1') {
  	delBtn.onclick =() => {
    	axios.delete(`https://crudcrud.com/api/e50b42eec8d14baeb8fabf66868def06/details/${newObj._id}`)
      .then(() => {
      	table1.removeChild(newLi);
      })
      .catch((error) => console.log(error));
    }
    newLi.appendChild(delBtn);
  	table1.appendChild(newLi);
  }
  else if(newObj.tableName == 'Table 2') {
  	delBtn.onclick =() => {
    	axios.delete(`https://crudcrud.com/api/e50b42eec8d14baeb8fabf66868def06/details/${newObj._id}`)
      .then(() => {
      	table2.removeChild(newLi);
      })
      .catch((error) => console.log(error));
    }
    newLi.appendChild(delBtn);
  	table2.appendChild(newLi);
  } 
  else if(newObj.tableName == 'Table 3') {
  	delBtn.onclick =() => {
    	axios.delete(`https://crudcrud.com/api/e50b42eec8d14baeb8fabf66868def06/details/${newObj._id}`)
      .then(() => {
      	table3.removeChild(newLi);
      })
      .catch((error) => console.log(error));
    }
    newLi.appendChild(delBtn);
  	table3.appendChild(newLi);
  } 
}


function addUser() {
	const price = document.getElementById('price').value;
  const dish = document.getElementById('dish').value;
  const table = document.getElementById('table').value;
  console.log(price)
  
  const currDetails = {
  	'price': price,
    'Dish': dish,
    'tableName': table
  };
  
  axios.post('https://crudcrud.com/api/e50b42eec8d14baeb8fabf66868def06/details', currDetails)
  .then((response) => {
  	const newObj = response.data;
    addExistingData(newObj);
  })
  .catch((err) => console.log(err));
}


function showExistingTables() {
	axios.get('https://crudcrud.com/api/e50b42eec8d14baeb8fabf66868def06/details')
  	.then((response) => {
    	const data = response.data;
      data.forEach((obj) => {
      	addExistingData(obj);
      });
    })
    .catch((error) => console.log(error));
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
  addUser();
})

showExistingTables();