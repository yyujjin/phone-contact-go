getUsers()

const addButton = document.querySelector("#addButton")
addButton.addEventListener("click", function () {
    location.href = "http://localhost:8080/add"
})

//go 에는 함수를 main 밖에있는 함수를 다 읽고 {}안으로 들어와서 다시 코드를 읽어내려가는데
//java는 전역 함수부터 읽는거 없이 그냥 순서대로 내려가는것인가? 
//새로고침 하면 잠시 없어졌다가 사라지는데 이걸보기위해서 디버깅을 해야하는데 무슨 코드를 어떻게 선택하여 보는지 ?

// let users = null  //null 이라 해도 됨? 아니면 안 적어도 됨 ? 자바니까?
//코드 읽는 순서
//user-management .js 에는
// let users = []이렇게 했는데 굳이 뺀 이유가 있는지 그리고
//a [] = b[] 배열에 배열이 들어오면 그냥 배열이 되는건지
//let 은 const쓰면 안되는지
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
                <button class="editButtons" ></button>
            </div>`
    }
    const deleteButtons = document.querySelectorAll(".deleteButtons")
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function () {
            deleteUser(i)
        })
    }
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
