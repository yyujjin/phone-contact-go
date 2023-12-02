const addButton = document.querySelector("#addButton")

getUsers()


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
    form.innerHTML=""
    for (let i=0; i<users.length; i++) {
        form.innerHTML +=
            `<div>
                <span>${users[i].Name}</span>
                <span>${users[i].Number}</span>
                <button class="deleteButtons"></button>
                <button class="editButtons" ></button>
            </div>` 
    }
    deleteUser()
}

function deleteUser() {
    const deleteButtons = document.querySelectorAll(".deleteButtons")
    for (let i=0; i<deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click",function() {
            alert("삭제하시겠습니까?")
            users.splice(i,1)
            makeList()
        })
    }
}