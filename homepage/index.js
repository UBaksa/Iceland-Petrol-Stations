const base = 'http://apis.is/petrol';
let response;
let data;
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
    let numStations = document.getElementById("numOfStations")
    numStations.innerHTML = data.results.length

    let numCompany = document.getElementById("numOfCompany")
    // let jedinstveni = [];
    // data.results.forEach(e=>{
        // jedinstveni.unshift(e.company)
    // console.log(jedinstveni.length);
    numCompany.innerHTML = 53
    console.log(typeof(data.results[0].geo.lat));



    //mapa//
    var map = L.map('map').setView([64.931, -19.021], 5)
    //geografske koordinate
    let lat = data.results.map((e)=>{return e.geo.lat})
    let lon = data.results.map((e)=>{return e.geo.lon})

    let city = data.results.map((e)=>{return e.name})
    
    console.log(city);
 
    // console.log(lat);
    // console.log(lon);
    var gasIcon = L.icon({
        // iconUrl: 'https://www.freeiconspng.com/thumbs/tear-png/tear-png-24.png',
    
        iconSize:     [48, 105], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-2, -76] // point from which the popup should open relative to the iconAnchor
    });

    for(i=0;i<lat.length;i++){
        let lat1=lat[i];
        let lon1=lon[i]
        // let city1=city[i]
        // let company1=company[i]-ne radi zbog njihove tastature,idk why...
        // console.log(company1);
      var marker = L.marker([lat1,lon1]).addTo(map);
      marker.bindPopup(data.results[i].name + " ," + data.results[i].company)
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
  //waypoint

 

}
getText(base);

//loader

let loader = document.getElementById("preloader")

window.addEventListener("load",()=>{
    setTimeout(() => {
        loader.style.display = "none";
    }, 1500);
})


//ovo je za normalan navbar da se makne login
// let navLogin = document.getElementById("navlogin")

// function logedNav(){
//     let korisnik = localStorage.getItem("ulogovan");
//     if(korisnik){
//         navLogin.innerHTML = "Logout"
//     }
//     else{
//         if(navLogin.innerHTML === "Logout"){
//             localStorage.clear();
//         }
//         navLogin.innerHTML = "Login"
//         localStorage.clear();   
//     }
// }
// window.addEventListener('storage', function(event) {
//     if (event.key === "ulogovan") {
//         logedNav();
//     }
// });

// logedNav();

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