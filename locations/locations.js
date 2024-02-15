
let loader = document.getElementById("preloader")

window.addEventListener("load",()=>{
    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
})


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

    let city= data.results.map((e)=>{return e.name})
    let pump = document.getElementById("pump");
    var optionn = document.createElement("option");
      console.log(pump.value);

   
    
    for(i=0;i<city.length;i++){
        var optionn = document.createElement("option");
        optionn.value = city[i];
        optionn.text = city[i]
        pump.appendChild(optionn)
    }
    console.log(pump.value);

    let selected = pump.options[pump.selectedIndex].value

    let selectedcity = data.results.filter((e)=>{
        return e.name === selected
    })
    console.log(selectedcity);

    let selectedCityLat = selectedcity[0].geo.lat
    let selectedCityLon = selectedcity[0].geo.lon

    console.log(selectedCityLat);
    console.log(selectedCityLon);

    var marker = L.marker([selectedCityLat,selectedCityLon]).addTo(map);
      marker.bindPopup(selectedcity[0].name + " ," + selectedcity[0].company )
      pump.addEventListener('change',()=>{
        let selectedValue = document.getElementById("pump").value;

    // Filtriranje podataka na osnovu selektovane vrednosti
    let selectedPump = data.results.filter((e) => {
        return e.name === selectedValue;
    });
    map.removeLayer(marker);

    selectedCityLat = selectedPump[0].geo.lat
    selectedCityLon = selectedPump[0].geo.lon
    marker = L.marker([selectedCityLat,selectedCityLon]).addTo(map);
    marker.bindPopup(selectedPump[0].name + " ," + selectedPump[0].company )
      })
}

getText(base)

var map = L.map('map').setView([64.931, -19.021], 6)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

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
logedNav();


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