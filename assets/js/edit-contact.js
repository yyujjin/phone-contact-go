const id = getId()
getUsers()


function getId() {
    const a = location.search
    const b = a.split("=")
    return b[1]
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
    //새로고침 기본동작 왜 막는거? 
    //여기는 왜 소문자
    // 쿼리스트링 ? 뒤에 있는게  body??
    await fetch(`http://localhost:8080/edit/${id}?name=${inputs[0].value}&number=${inputs[1].value}`, {
        method: "PUT",
        body: new FormData(form),
    })
    location.href = `http://localhost:8080/list`
})
}