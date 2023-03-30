document.addEventListener('DOMContentLoaded', () => {
    const tBody = document.getElementById('table-body')
    const form = document.getElementById('dog-form')
    
 fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => submitData(data))

function submitData(data) {
    data.forEach(element => {
        const tRow = document.createElement('tr')
        const tdName = document.createElement('td')
        const tdBreed = document.createElement('td')
        const tdSex = document.createElement('td')
        const tdEdit = document.createElement('td')
        const editButton =document.createElement('button')
        tdName.innerText = element.name
        tdBreed.innerText = element.breed
        tdSex.innerText = element.sex
        editButton.innerText = "Edit"
        tRow.appendChild(tdName)
        tRow.appendChild(tdBreed)
        tRow.appendChild(tdSex)
        tdEdit.appendChild(editButton)
        tRow.appendChild(tdEdit)
        tBody.appendChild(tRow)

        editButton.addEventListener('click', () => moveToForm(element.name, element.breed, element.sex,element.id))
        
    });
    function moveToForm(name, breed, sex, id) {
        form.children[0].value = name
        form.children[1].value = breed
        form.children[2].value = sex
        form.children[3].innerText = id
         console.log(form.children)

    }   
    form.addEventListener('submit', event => submitForm(event))
    function submitForm(event) {
        event.preventDefault()
        console.log(`http://localhost:3000/dogs/${event.target.children[3].innerText}`)
       fetch(`http://localhost:3000/dogs/${event.target.children[3].innerText}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accepts": "application/json",
        },
        body: JSON.stringify({
            name: event.target.children[0].value,
            breed: event.target.children[1].value,
            sex: event.target.children[2].value
       })
       })
       tBody.innerHTML= ""

       fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => submitData(data))
    }
}
    
})