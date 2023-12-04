getUsers()

const addButton = document.querySelector("#addButton")
addButton.addEventListener("click", function () {
    location.href = "http://localhost:8080/add"
})

async function getUsers() {
    let users = null
    const res = await fetch("http://localhost:8080/getUsers")
    const data = await res.json()
    users = data
    console.log(users)
    makeList(users)
}

function makeList(users) {
    const form = document.querySelector("form")
    form.innerHTML = ""
    for (let i = 0; i < users.length; i++) {
        form.innerHTML += `<div>
                <span>${users[i].Name}</span>
                <span>${users[i].Number}</span>
                <button class="deleteButtons"></button>
                <button class="editButtons" type="button" ></button>
            </div>`
    }
    const deleteButtons = document.querySelectorAll(".deleteButtons")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            deleteUser(i)
        })
    }
    editUser()
}

async function deleteUser(i) {
    const confirmDelete = confirm("삭제하시겠습니까?")
    if (!confirmDelete) {
        return
    }
    try {
        await fetch(`http://localhost:8080/delete/${i}`, {
            method: "DELETE",
        })
        getUsers()
    } catch (error) {
        console.error("네트워크 오류:", error)
    }
}

function editUser() {
    const editButtons = document.querySelectorAll(".editButtons")
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function () {
            alert(i)
            location.href = `http://localhost:8080/edit?id=${i}`
        })
    }
}
