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
    const hashObject = new jsSHA("SHA-512","TEXT",{numRounds: 1});
    hashObject.update(text);
    const hash = hashObject.getHash("HEX");
    console.log(hash);
    return hash;
}



const btn = document.getElementById("btn")
const usernameDiv = document.getElementById("usernamee")
const passwordDiv = document.getElementById("passwordd")
const alertt = document.createElement("h3")
const alerttt = document.createElement("h3")

    btn.addEventListener('click',()=>{
        const user=users.find(user=>user.username===valueUsername)
          if(!user){
            if(alertt.textContent == ""){
            alertt.innerHTML = "User is not registred"
            alertt.style.fontSize = "1rem"
            alertt.style.fontFamily = "Kanit"
            alertt.style.color = "red"
            console.log(usernameDiv);
              usernameDiv.appendChild(alertt)
            }
            else if(alertt.textContent !== ""){
              alertt.innerHTML = ""
            }
            console.log("nije dobar username")
          }
          else if(hashing(valuePass)!==user.password){
          alertt.innerHTML="";
          if(alerttt.textContent == ""){
            alerttt.innerHTML = "Wrong password"
            alerttt.style.fontSize = "1rem"
            alerttt.style.fontFamily = "Kanit"
            alerttt.style.color = "red"
              passwordDiv.appendChild(alerttt)
            }
          console.log("nije dobra sifra");
        }
        else{
          alerttt.innerHTML=""
          alertt.innerHTML=""
          localStorage.setItem("ulogovan", valueUsername);
          console.log(localStorage);
          Toastify({
            text: "Successfully logged in.",
            duration: 2000,
            close: true,
            gravity: "top", 
            position: "right", 
            backgroundColor: "#02529C", 
            style:{
                fontFamily:"Kanit",
            },
        
          }).showToast()
            setTimeout(()=>{
          document.location.href='../homepage/index.html'},2000)
          console.log("sve radi");
        }
    })

    //responsive navbar za telefone
const btnn=document.getElementById('nav-mobile')
const divv=document.getElementById('slide')
const shorter=document.querySelector("#shorter")
const longer=document.querySelector("#longer")
var isMenuOn = false;

btnn.addEventListener('click',()=>{
    if(!isMenuOn){
        divv.style.marginLeft="0px"
        shorter.style.rotate="-45deg"
        longer.style.rotate="45deg"
        shorter.style.marginTop="-3vh"
        longer.style.marginTop="2vh"



    }
    else{
        divv.style.marginLeft="100%"
        shorter.style.rotate="0deg"
        longer.style.rotate="0deg"
        shorter.style.marginTop="0vh"
        longer.style.marginTop="0vh"


    }
    isMenuOn=!isMenuOn
})

