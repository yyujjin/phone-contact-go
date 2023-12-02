const addButton = document.querySelector("#addButton")

const users = [
    {
        name : "박유진",
        phone : "010-9392-7723"
    },
    {
        name : "박수현",
        phone : "010-9392-7723"
    }
]

makeList()



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

function makeList() {
    const form = document.querySelector("form")
    form.innerHTML=""
    for (let i=0; i<users.length; i++) {
        form.innerHTML +=
            `<div>
                <span>${users[i].name}</span>
                <span>${users[i].phone}</span>
                <button class="deleteButtons"></button>
                <button class="editButtons" ></button>
            </div>` 
    }
    deleteUser()
}
   
    
