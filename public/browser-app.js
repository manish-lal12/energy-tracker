//browser-app.js

const energyDisplayDOM = document.querySelector('.energy-display')
const loadingDOM = document.querySelector('.loading')
const consumerInputDOM = document.querySelector('.consumer-input')
const energyInputDOM = document.querySelector('.energy-input')
const formAlertDOM = document.querySelector('.form-alert')
const submitButtonDOM = document.querySelector('.btn-submit')
const tableBodyDOM = document.querySelector('.data-table-body')

//Create a row for table
const createRow = (rowData) => {
    const {_id: consumerID, name, consumption } = rowData
    const row = document.createElement('tr');
    row.classList.add('single-row-data');
    
    const idCell = document.createElement('td');
    idCell.textContent = consumerID;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell);

    const consumptionCell = document.createElement('td');
    consumptionCell.textContent = consumption;
    row.appendChild(consumptionCell);

    const linksCell = document.createElement('td');

    const editLink = document.createElement('a');
    editLink.href = `energyData.html?id=${consumerID}`;
    editLink.classList.add('edit-link')
    editLink.textContent = 'Edit'

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-btn')
    deleteButton.dataset.id = consumerID;
    deleteButton.textContent = 'Delete'
    linksCell.appendChild(editLink);
    linksCell.appendChild(deleteButton);
    row.appendChild(linksCell);

    return row;
}


//Load Energy Values   /api/v1/energy
const showConsumptions = async () => {
    loadingDOM.style.visibility = 'visible'
    try { 
        const {
            data: { user }
        } = await axios.get('/api/v1/energy/')

        if (user.length < 1) {
            energyDisplayDOM.innerHTML = '<h5 class="empty-list">No User Data Available...</h5>'
            loadingDOM.style.visibility = 'hidden'
            return; //check it; or remove it
        }
        
        tableBodyDOM.innerHTML = '';

        for (const userId in user) {
            if (Object.hasOwnProperty.call(user, userId)) {
                const userData = user[userId];
                const row = createRow(userData);
                tableBodyDOM.appendChild(row);
            }
        }
    }
    catch (error) {
        energyDisplayDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try again later...</h5>'
    }
    loadingDOM.style.visibility = 'hidden'
}

showConsumptions()


//delete consumer details  /api/v1/energy/:consumerID

energyDisplayDOM.addEventListener('click', async (e) => {
    console.log("Delete button clicked")
    const el = e.target
    if (el.classList.contains('delete-btn')) {
        console.log("clicked success")
        loadingDOM.style.visibility = 'visible'
        const id = el.dataset.id
        try {
            await axios.delete(`/api/v1/energy/${id}`)
            showConsumptions()
        }
        catch (error) {
            console.log(error)
        }
    }
    loadingDOM.style.visibility = 'hidden'
})


// form

submitButtonDOM.addEventListener('click', async (e) => {
    e.preventDefault()

    const name = consumerInputDOM.value   //name of consumer
    const consumption = energyInputDOM.value  //energy consumed

    try {
        await axios.post('/api/v1/energy', { name, consumption })
        showConsumptions()
        consumerInputDOM.value = ''
        energyInputDOM.value = ''
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `Success, consumer added`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        formAlertDOM.style.display = 'none'
        formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})
