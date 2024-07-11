var username,email,dob;
let usersList = [];
function StoreUserValues(){
    username = document.getElementById("Name").value
    email = document.getElementById("email").value
    dob = document.getElementById("date").value
    if(localStorage.getItem("users")){
        const userArray =  JSON.parse(localStorage.getItem("users"))
        if(!userExist(userArray,username,email)){
            userArray.push({username,email,dob})
            localStorage.setItem("users",JSON.stringify(userArray))
            showalert("User has been created successfully","success");
        }
        else{
            showalert("User already exists","danger")
        }
       
    }
    else{
        usersList.push({username,email,dob})
        localStorage.setItem("users",JSON.stringify(usersList))
        showalert("User has been created successfully","success");
    }
    DisplayUsers()

   
}


function DisplayUsers(){
    const users = JSON.parse(localStorage.getItem("users"))
    var userDiv = document.getElementById("userDiv")
    userDiv.innerHTML = ''
    users.forEach(user => {
        const div = document.createElement('div');
        div.innerHTML = `
         <div class="d-flex align-items-center">
                <div>
                    <img src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" width="60" height="60"> 
                </div>
                <div>
                    <div class="d-flex align-items-center gap-4">
                        <p><b>Name: </b>${user.username}</p>
                        <p class="text-secondary"><b class="text-dark">DOB: </b>${user.dob}</p>
                        <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
                    </div>
                    <div>
                        <p><b>Email: </b>${user.email}</p>
                    </div>
                </div>
               
            </div>
        `

        userDiv.appendChild(div)
    });

}

function showalert(message,type){
    const alert = document.getElementById("alert")
    alert.innerHTML = `
     <div class="alert alert-${type}" role="alert">
        ${message}
    </div>
    `
    setTimeout(() => {
        alert.innerHTML = ""
    }, 3000);
}

document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    StoreUserValues();
});

document.addEventListener('DOMContentLoaded',(event)=>{
    DisplayUsers()
    const userDiv = document.getElementById("userDiv");
   
    userDiv.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteBtn')) {   
            const childDiv = event.target.parentNode.parentNode.children;
            const username = childDiv[0].children[0].innerText.split(":")[1]
            const email = childDiv[1].children[0].innerText.split(":")[1]
            

            
        }
    });
});


// const username = childDiv.children[0].innerText.split(":")
//             const email = childDiv.children
//             console.log(email)

function userExist(userArray,username,email){
    const user = userArray.find((items)=>items.username == username && items.email == email)
    return user
}


