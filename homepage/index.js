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
