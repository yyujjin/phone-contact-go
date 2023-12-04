const id = getId()
getUsers()


function getId() {
    const query = location.search.split("=")
    return query[1]
}

async function getUsers() {
    const res = await fetch(`http://localhost:8080/getId?id=${id}`)
    const data = await res.json()
    console.log(data)
    const inputs = document.querySelectorAll("input")
    console.log(inputs)
    inputs[0].value = data.Name
    inputs[1].value = data.Number
    submitForm(inputs)
}

function submitForm(inputs) {
const form = document.querySelector("form")
form.addEventListener("submit", async function (event) {
    event.preventDefault()
    await fetch(`http://localhost:8080/edit/${id}`, {
        method: "PUT",
        body: new FormData(form),
    })
    location.href = `http://localhost:8080/list`
})
}