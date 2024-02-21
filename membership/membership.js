let loader = document.getElementById("preloader")

window.addEventListener("load",()=>{
    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
})

const base = 'http://apis.is/petrol';
let response;
let data;
//automobili
let diesel = document.getElementById("diesel");
let bensin = document.getElementById("bensin");

let dieselOld = document.getElementById("dieselOld")
let bensinOld = document.getElementById("bensinOld")
//kamioni
let truckOwned =  document.getElementById("truckCompany")
let truckDiesel = document.getElementById("truckDiesel")
let truckOldDiesel = document.getElementById("truckOldDiesel")



async function getText(file) {
    try {
        response = await fetch(file);
        data = await response.json();
        console.log(data.results);
        data.results.forEach(element => {
            console.log(element.company);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    let city= data.results.map((e)=>{return e.name})
    let pump = document.getElementById("pump");
    var optionn = document.createElement("option");!
    console.log(pump.value);

    let discount = 0.1//popust za membere

    for(i=0;i<city.length;i++){
        var optionn = document.createElement("option");
        optionn.value = city[i];
        optionn.text = city[i]
        if(i==0){
            optionn.selected=true
        }
        pump.appendChild(optionn)
    }

    //ovo je za prve vrednosti jer se ne reloada window
    diesel.innerHTML=(data.results[0].diesel-(data.results[0].diesel*discount)).toFixed(2) + "kr"
    bensin.innerHTML=(data.results[0].bensin95-(data.results[0].bensin95*discount)).toFixed(2) + "kr"


    dieselOld.innerHTML=data.results[0].diesel + "kr"
    bensinOld.innerHTML=data.results[0].bensin95 + "kr"

    //za automobile.
function updateSelectedPump() {
    let selectedValue = document.getElementById("pump").value;

    let selectedPump = data.results.filter((e) => {
        return e.name === selectedValue;
    });

    console.log(selectedPump);

    let dieselDiscount = selectedPump[0].diesel * discount
    let bensin95Discount = selectedPump[0].bensin95 * discount

    diesel.innerHTML = (selectedPump[0].diesel - dieselDiscount).toFixed(2) + "kr";
    bensin.innerHTML = (selectedPump[0].bensin95 - bensin95Discount).toFixed(2) + "kr";
    dieselOld.innerHTML=selectedPump[0].diesel + "kr"
    bensinOld.innerHTML=selectedPump[0].bensin95 + "kr"

}

window.onload = function() {
    updateSelectedPump();
};

document.getElementById("pump").addEventListener("change", function() {
    updateSelectedPump();
});
    //za automobile





    //za kamione


    function updateSelectedTruckPump() {
        let selectedTruckValue = document.getElementById("truckPump").value;
    
        let selectedTruckPump = data.results.filter((e) => {
            return e.name === selectedTruckValue;
        });
    
        console.log(selectedTruckPump);
    
    
    
        truckDiesel.innerHTML = selectedTruckPump[0].diesel-truckDiscount + "kr";
        let truckDiscountNew = (selectedTruckPump[0].diesel-truckDiscount)*discount
    truckOldDiesel.innerHTML = (selectedTruckPump[0].diesel-truckDiscountNew).toFixed(2) + "kr"

        if (selectedTruckPump[0].company.length <= 10) {
            truckOwned.innerHTML = selectedTruckPump[0].company;
        } else {
            truckOwned.innerHTML = selectedTruckPump[0].company.slice(0, 9) + "..";
        }
        
    }
    
    window.onload = function() {
        updateSelectedTruckPump();
    };
    
    document.getElementById("truckPump").addEventListener("change", function() {
        updateSelectedTruckPump();
    })



    let truckPump = document.getElementById("truckPump");
    var optionnn = document.createElement("option");

    

    for(i=0;i<city.length;i++){
        var optionnn = document.createElement("option");//jer se kreira vise novih pa ne moze let!!
        optionnn.value = city[i];
        optionnn.text = city[i]
        truckPump.appendChild(optionnn)
    }
    console.log(pump.value);

    let truckSelected = truckPump.options[truckPump.selectedIndex].value

    let truckSelectedPump = data.results.filter((e)=>{
        return e.name === truckSelected
    })

    let truckDiscount = 8.5
    if(truckSelectedPump[0].company.length < 10){
       truckOwned.innerHTML = truckSelectedPump[0].company
    }
    else{
         truckOwned.innerHTML = truckSelectedPump[0].company.slice(0,10) + "..."
    }
    truckDiesel.innerHTML = truckSelectedPump[0].diesel - truckDiscount + "kr"

    let truckDiscountNew = (truckSelectedPump[0].diesel-truckDiscount)*discount
    console.log(truckDiscountNew);
    truckOldDiesel.innerHTML = (truckSelectedPump[0].diesel-truckDiscountNew).toFixed(2) + "kr"
}

getText(base);


let navLogin = document.getElementById("navlogin")

function logedNav() {
    let korisnik = localStorage.getItem("ulogovan");
    if (korisnik) {
        navLogin.innerHTML = "Logout";
        navLogin.href = "#"
    } else {
        navLogin.innerHTML = "Login";
        navLogin.href = "../login/login.html";
    }
}

navLogin.addEventListener('click', function() {
    if (navLogin.innerHTML === "Logout") {
        localStorage.removeItem("ulogovan");
        window.location.reload();
        event.preventDefault(); 
        logedNav(); 
    }
});

window.addEventListener('storage', function(event) {
    if (event.key === "ulogovan") {
        logedNav();
    }
});

logedNav();



//da li je ulogovan

let notMember = document.getElementById("not-member")
console.log(notMember);
let isMember = document.getElementById("member")

function isLoged(){
    let korisnik = localStorage.getItem("ulogovan");
    if(korisnik){
        notMember.style.display = "none"
        isMember.style.display = "inline-block"  
    }
    else{
        isMember.style.display = "none"
        notMember.style.display = "inline-block"
    }
}

window.addEventListener('storage', function(event) {
    if (event.key === "ulogovan") {
        isLoged();
    }
});
isLoged()

//responsive navbar za telefone
const btn=document.getElementById('nav-mobile')
const divv=document.getElementById('slide')
const shorter=document.querySelector("#shorter")
const longer=document.querySelector("#longer")
var isMenuOn = false;

btn.addEventListener('click',()=>{
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

function logedNavPhone() {
    let korisnik = localStorage.getItem("ulogovan");
    if (korisnik) {
        navLoginn.innerHTML = "Logout";
        navLoginn.href = "#"
    } else {
        navLoginn.innerHTML = "Login";
        navLoginn.href = "../login/login.html";
    }
}

navLoginn.addEventListener('click', function() {
    if (navLoginn.innerHTML === "Logout") {
        localStorage.removeItem("ulogovan");
        event.preventDefault(); 
        logedNavPhone(); 
    }
});

window.addEventListener('storage', function(event) {
    if (event.key === "ulogovan") {
        logedNavPhone();
    }
});

logedNavPhone();