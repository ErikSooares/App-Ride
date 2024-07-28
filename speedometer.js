const speedElement = document.querySelector("#speed");
const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");

let watchID = null;
let currentRide = null;

btnStart.addEventListener("click", ()=>{

    function handleSuccess(position){
        addPosition(currentRide, position);
        speedElement.innerHTML = position.coords.speed ? parseInt(position.coords.speed * 3.6) : 0;
    }

    function handleError(position){
        console.log(error.msg)
    }

    const options = {enableHighAccuracy: true}

    currentRide = createNewRide();
    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options);

    btnStart.classList.add("d-none");
    btnStop.classList.remove("d-none");
})

btnStop.addEventListener("click", ()=>{

    navigator.geolocation.clearWatch(watchID)
    watchID = null
    
    updateStopTime(currentRide);
    currentRide = null;

    speedElement.innerText = 0;

    btnStart.classList.remove("d-none");
    btnStop.classList.add("d-none");

    window.location.href = "./index.html"
})