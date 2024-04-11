const consumerIdDOM = document.querySelector('.consumer-edit-id')
const consumerNameDOM = document.querySelector('.consumer-edit-name')
const consumptionDOM = document.querySelector('.consumer-edit-consumption')
const editFormDOM = document.querySelector('.single-task-form')
const editButtonDOM = document.querySelector('.task-edit-btn') //check later
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')  //gets the id passed in the url and assigns it to 'id' variable
let tempName
console.log(id)

const showConsumption = async () => {
    try {
        const { data: { user } } = await axios.get(`/api/v1/energy/${id}`) //NOT GETTING THE DATA
        const { _id: consumerID, name, consumption } = user
        consumerIdDOM.textContent = consumerID 
        consumerNameDOM.value = name
        consumptionDOM.value = consumption
        console.log(consumerIdDOM.textContent, consumerNameDOM.value, consumptionDOM.value)
    } catch(error) {
        console.log(error)
    }
}


showConsumption()

editFormDOM.addEventListener('submit', async(e) => {
    editButtonDOM.textContent = 'Loading...'
    e.preventDefault()

    try {
        const consumerName = consumerNameDOM.value
        const consumptionDetails = consumptionDOM.value
        console.log(consumerName, consumptionDetails)
        const {
            data: {user}
        } = await axios.patch(`/api/v1/energy/${id}`, {
            name: consumerName,
            consumption: consumptionDetails
        })
        const { _id: consumerID, name, consumption } = user

        consumerIdDOM.textContent = consumerID
        consumerNameDOM.value = name
        tempName = name
        consumptionDOM.value = consumption

        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, edited consumer details`
        formAlertDOM.classList.add('text-success')
    } catch (error) {
        console.log("Error: ",  error)
        consumerNameDOM.value = tempName
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    editButtonDOM.textContent = 'Edit'
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})