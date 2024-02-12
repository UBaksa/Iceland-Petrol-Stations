let loader = document.getElementById("preloader")

window.addEventListener("load",()=>{
    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
})

let users=[]

//povlacimo usere koje smo mi kreirali jer nemam backend da povucem usere kao register f-ju.
document.addEventListener("DOMContentLoaded",  () => {
    fetch("user.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Greska -> ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        users=data.users
  
      })
      .catch(error => {
        console.error('Problem sa povlacenjem/fetchovanjem:', error);
      });
  });


const username = document.getElementById("username")
const password = document.getElementById("password")

let valueUsername = "";
let valuePass = "";

username.addEventListener("input",()=>{
    valueUsername=username.value
})
password.addEventListener("input",()=>{
    valuePass = password.value
})

//f-ja za hashovanje
const hashing = (text) =>
{
    const hashObj = new jsSHA("SHA-512","TEXT",{numRounds: 1});
    hashObj.update(text);
    const hash = hashObj.getHash("HEX");
    return hash;
}



const btn = document.getElementById("btn")
const usernameDiv = document.getElementsByClassName("username")
const passwordDiv = document.getElementsByClassName("password")


    btn.addEventListener('click',()=>{
        const user=users.find(user=>user.username===valueUsername)
          if(!user){
            const alertt = document.createElement("h3")
            alert.innerHTML = "User is not created"
            alert.fontSize = "1rem"
            alert.fontFamily = "Kanit"
            alert.color = "#02529C"
            console.log(usernameDiv);
            usernameDiv.appendChild(alertt)
            console.log("hsafkjsadsadsadsad")
        }
        else if(hashing(valuePass)!==user.password){
          console.log("hsafkjsa");
        }
        else{
            localStorage.setItem("logged", usernameValue);
            document.location.href='../homepage/index.html'
          console.log("hsafkjsaaaaaaaaa");
        }
    })
