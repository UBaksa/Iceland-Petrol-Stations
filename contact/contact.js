let loader = document.getElementById("preloader")

window.addEventListener("load",()=>{
    setTimeout(() => {
        loader.style.display = "none";
    }, 1500);
})


let navLogin = document.getElementById("navlogin")

function logedNav(){
    let korisnik = localStorage.getItem("ulogovan");
    if(korisnik){
        navLogin.style.display = "none"
    }
    else{
        navLogin.style.display = "inline-block"
    }
}
window.addEventListener('storage', function(event) {
  if (event.key === "ulogovan") {
      logedNav();
  }
});
logedNav()


function contact(){
    const mailPattern = /^.+@.+\.[a-zA-Z]{2,3}$/
    const namePattern = /^[a-zA-Z\s]+$/


    const fullName = document.getElementById("fullName");
    const fullNameValue = fullName.value
    const nameError = document.getElementById("nameError")
    nameError.style.fontSize = "1rem"
    nameError.style.fontFamily = "Kanit"
    nameError.style.color = "red"

    const email = document.getElementById("email")
    const emailValue = email.value
    const emailError = document.getElementById("emailError")
    emailError.style.fontSize = "1rem"
    emailError.style.fontFamily = "Kanit"
    emailError.style.color = "red"


    const message = document.getElementById("message")
    const messageValue = message.value
    const messageError= document.getElementById("messageError")
    const messageTest = messageValue !== ""
    messageError.style.fontSize = "1rem"
    messageError.style.fontFamily = "Kanit"
    messageError.style.color = "red"
    

nameError.textContent = namePattern.test(fullNameValue) ? "" : "You can only use letters.";
emailError.textContent = mailPattern.test(emailValue) ? "" : "Enter valid email.";
messageError.textContent =messageTest ? "" : "Enter a message.";

if(fullNameValue && emailValue && messageTest) {
  nameError.value = "";
  emailError.value = "";
  messageError.value = "";
  Toastify({
    text: "Message sent!",
    duration: 2000,
    close: true,
    gravity: "top", 
    position: "right", 
    backgroundColor: "#02529C", 
    style:{
        fontFamily:"Kanit",
    },

  }).showToast();
  setTimeout(()=>{
    document.location.href='../homepage/index.html'},2000)
}

localStorage.setItem("contactedUs",fullNameValue)    
}

const btn = document.getElementById("btn")

btn.addEventListener('click', () => {
    contact();
  })




//phone responsive
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

//ovo je za phone da se makne login
let navLoginn = document.getElementById("navloginn")

function logedNavPhone(){
    let korisnik = localStorage.getItem("ulogovan");
    if(korisnik){
        navLoginn.style.display = "none"
    }
    else{
        navLoginn.style.display = "inline-block"
    }
}
window.addEventListener('storage', function(event) {
    if (event.key === "ulogovan") {
        logedNavPhone();
    }
});

logedNavPhone();