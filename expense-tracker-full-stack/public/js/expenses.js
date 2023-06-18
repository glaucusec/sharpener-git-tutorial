    // Logout button 
    document.querySelector('#logout').addEventListener('click', () => {
        localStorage.removeItem('token');
        alert('You are Logged Out. Login Again');
        window.location = 'http://localhost:3000/user/login';
    })
    // fetching the old report fileURLs and showing it to the screen.
    let page = 1;

    const dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('change', handleDropdownChange);
    function handleDropdownChange() {
        const selectedValue = dropdown.value;
        localStorage.setItem('limit', selectedValue);
    }

    function Pagination(n, p, c) {
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';
        if(p) {
            const ulElement = document.createElement('li');
            ulElement.classList.add('page-item', 'page-link');
            ulElement.textContent = p;
            ulElement.addEventListener('click', () => {
                getoldURLs(p);
            })
            pagination.appendChild(ulElement);
        }

        const ulElement = document.createElement('li');
        ulElement.classList.add('page-item', 'active', 'page-link');
        ulElement.textContent = c;
        ulElement.addEventListener('click', () => {
            getoldURLs(c);
        })
        pagination.appendChild(ulElement);

        if(n) {
            const ulElement = document.createElement('li');
            ulElement.classList.add('page-item', 'page-link');
            ulElement.textContent = n;
            ulElement.addEventListener('click', () => {
                getoldURLs(n);
            })
            pagination.appendChild(ulElement);
        }
    }

    function listURLs(urls) {
        const tbody = document.querySelector('#tbody-fileurls');
        tbody.innerHTML = '';
        urls.forEach(url => {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            const urlparts = url.fileURL.split('/');
            let date = decodeURIComponent(urlparts[urlparts.length - 1]);
            td.innerHTML = `<a href="${url.fileURL}">${date.split('(')[0]}</a>`;
            tr.appendChild(td);
            tbody.appendChild(tr);
        })
    }

    function getoldURLs(page) {
        const limit = parseInt(localStorage.getItem('limit'));
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:3000/premium/fileurls?page=${page}&limit=${limit}`, {
            headers: {
                'Authorization': token
            }
        })
        .then(result => {
            listURLs(result.data.results);
            Pagination(result.data.next, result.data.previous, result.data.current);
        })

        // try {
        //     let prevFiles = await axios.post('http://localhost:3000/premium/fileurls', {}, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': token
        //         }
        //     })
        //     const tbody = document.querySelector('#tbody-fileurls');
        //     JSON.parse(prevFiles.data).forEach((ele) => {
        //         const td = document.createElement('td');
        //         const tr = document.createElement('tr');

        //         const urlparts = ele.fileURL.split('/');
        //         let date = decodeURIComponent(urlparts[urlparts.length - 1]);
                
        //         td.innerHTML = `<a href="${ele.fileURL}">${date.split('(')[0]}</a>`
        //         tr.appendChild(td);

        //         tbody.appendChild(tr);
        //     });
        // } catch (err) {
        //     console.log(err);
        // }
    }
    

    // Downloading the report form the backend.
    document.querySelector('#report-button').addEventListener('click', async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/premium/download-report', {
            headers: {
                'Authorization': token
            }
        })
        .then(response => {
            console.log(response.data.fileURL);
            if(response.status === 200) {
                document.location = response.data.fileURL
            }
        })
        .catch(err => console.log(err));
    });

    // Show LeaderBoard Function

    const leaderboardSection = document.querySelector('#leaderboard-section');
    const leaderboardBody = document.querySelector('#tbody-leaderboard');
    let isVisible = false

    document.querySelector('#leaderboard-button').addEventListener('click', async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/premium/leaderboard', {}, {
            headers: {
                "Authorization": token
            }
        })
        .then(leaderboard => {
            leaderboardBody.innerHTML = '';
            leaderboard.data.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = '';
                const tdName = document.createElement('td');
                tdName.textContent = user.name;

                const tdAmount = document.createElement('td');
                tdAmount.textContent = user.totalAmount;

                tr.appendChild(tdName);
                tr.appendChild(tdAmount);

                leaderboardBody.appendChild(tr);
            });


            
            if(isVisible) {
                leaderboardSection.style.display = 'none';
            } else {
                leaderboardSection.style.display = 'block'
            }
            isVisible = !isVisible;
        })
        .catch(err => console.log(err));
    })

    // Check if the user is already a existing Premium user.? (show the text 'You are premium')
    const token = localStorage.getItem('token');
    async function hideOrNot () {
        await axios.post('http://localhost:3000/purchase/ispremium', null, {
            headers: {
                "Authorization" : token
            }
        })
        .then(result => {
            if(result.data.isPremiumUser) {
                const rzpButton = document.getElementById('rzp-button1');
                rzpButton.style.display = 'none';
                document.getElementById('premiumText').textContent = 'You are a Premium User';
                document.getElementById('premiumText').style.fontWeight = 'bold';
                document.getElementById('report-button').style.display = 'block';

            }
        })
        .catch(err => console.log(err));
    }

    hideOrNot();

    const rzpButton = document.getElementById("rzp-button1");
    rzpButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3000/purchase/premium', null, {
            headers: {
                "Authorization" : token
            }
        })
        
        let options = {
            "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Abhishek Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": response.data.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": async function(res) {
                const token = localStorage.getItem('token');
                await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                    success: true,
                    order_id: res.razorpay_order_id,
                    payment_id: res.razorpay_payment_id
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                }).then((res) => {
                    console.log(res);
                    alert('You are a Premium user');
                    window.location.href = 'http://localhost:3000/user/daily-expenses'
                }).catch((error) => console.log(error));

                
            },
            "prefill": {
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        
        let rzp1 = new Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', async function(response) {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus', {
                success: false,
                order_id: response.error.metadata.order_id,
                payment_id: response.error.metadata.payment_id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            alert(response.error.description);
        })
    })

    const formEl = document.querySelector('#submit-button');
    // sending the form data to the backend

    formEl.addEventListener('click', (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData(document.querySelector('#expense-form'));

        // Check if all the form fields have values
        if (!formData.get('amount') || !formData.get('description') || !formData.get('category')) {
            alert('Please fill out all the fields!');
            return;
        }

        axios.post('http://localhost:3000/user/expenses', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        .then(window.location.href = 'http://localhost:3000/user/daily-expenses');
    });

    
    const tbody = document.querySelector('.tbody'); 

    function addExpenseToScreen(expense) {
        const tr = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = expense.id;

        const tdAmount = document.createElement('td');
        tdAmount.textContent = expense.amount;

        const tdDesc = document.createElement('td');
        tdDesc.textContent = expense.description;

        const tdCategory = document.createElement('td');
        tdCategory.textContent = expense.category;

        // Adding the Delete Button
        const tdDelete = document.createElement('td');
        const delBtn = document.createElement('input');
        delBtn.type = 'button';
        delBtn.value = 'Delete';
        delBtn.classList.add('btn', 'btn-danger');
        delBtn.onclick = () => {
            let expense_id = expense._id;
            let token = localStorage.getItem('token');
            axios.delete('/user/delete', {
                headers: {
                    'Authorization': token
                },
                data: {
                    id: expense_id
                }
            })
            .then(window.location.href = 'http://localhost:3000/user/daily-expenses')
            .catch(err => console.log(err));
        }
        tdDelete.appendChild(delBtn);

        // Adding the Edit Button
        const tdEdit = document.createElement('td');
        const editBtn = document.createElement('input');
        editBtn.type = 'button';
        editBtn.value = 'Edit';
        editBtn.classList.add('btn', 'btn-warning');
        editBtn.onclick = () => {
            document.getElementById('idInputBox').value = expense._id;
            document.getElementById('amountInputBox').value = expense.amount;
            document.getElementById('descInputBox').value = expense.description;
            document.getElementById('catInputBox').value = expense.category;
        }
        tdEdit.appendChild(editBtn);

        tr.appendChild(tdId);
        tr.appendChild(tdAmount);
        tr.appendChild(tdDesc);
        tr.appendChild(tdCategory);
        tr.appendChild(tdDelete);
        tr.appendChild(tdEdit);

        tbody.appendChild(tr);
    }

    // Showing existing expenses.
    async function fetchExpenses() {
        const token = localStorage.getItem('token');
        let response = await axios.get('http://localhost:3000/user/expenses', {
            headers: {
                "Authorization": token
            }
        });
        let data = response.data;
        data.forEach(expense => {
            addExpenseToScreen(expense);
        });
    }

    fetchExpenses();
    // calling the getOldUrls with the default value of page 1
    getoldURLs(page);