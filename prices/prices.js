const base = 'http://apis.is/petrol';
let response;
let data;
//automobili
let diesel = document.getElementById("diesel");
let bensin = document.getElementById("bensin");
let owned = document.getElementById("company");
//kamioni
let truckOwned =  document.getElementById("truckCompany")
let truckDiesel = document.getElementById("truckDiesel")

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


    for(i=0;i<city.length;i++){
        var optionn = document.createElement("option");
        optionn.value = city[i];
        optionn.text = city[i]
        if(i==0){
            optionn.selected=true
        }
        pump.appendChild(optionn)
    }
    diesel.innerHTML=data.results[0].diesel
    bensin.innerHTML=data.results[0].bensin95
    company.innerHTML=data.results[0].company
function updateSelectedPump() {
    let selectedValue = document.getElementById("pump").value;

    let selectedPump = data.results.filter((e) => {
        return e.name === selectedValue;
    });

    console.log(selectedPump);



    diesel.innerHTML = selectedPump[0].diesel;
    bensin.innerHTML = selectedPump[0].bensin95;
    if (selectedPump[0].company.length <= 10) {
        owned.innerHTML = selectedPump[0].company;
    } else {
        owned.innerHTML = selectedPump[0].company.slice(0, 9) + "..";
    }
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
    
    
    
        truckDiesel.innerHTML = selectedTruckPump[0].diesel;
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
    var optionnn = document.createElement("option");//jer se kreira vise novih pa ne moze let!!
    // optionn.text = city[0]
    // pump.appendChild(optionn)<--- test:p

    

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

    let truckDiscount = 5.3
    if(truckSelectedPump[0].company.length < 10){
       truckOwned.innerHTML = truckSelectedPump[0].company
    }
    else{
         truckOwned.innerHTML = truckSelectedPump[0].company.slice(0,10) + "..."
    }
    truckDiesel.innerHTML = truckSelectedPump[0].diesel - truckDiscount
}

getText(base);

let loader = document.getElementById("preloader")

window.addEventListener("load",()=>{
    setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
})