const speedElement = document.querySelector("#speed");
const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");

let watchID = null;

btnStart.addEventListener("click", ()=>{

    function handleSuccess(position){
        speedElement.innerHTML = position.coords.speed ? parseInt(position.coords.speed * 3.6).toFixed(1) : 0;
    }

    function handleError(position){
        console.log(error.msg)
    }

    const options = {enableHighAccuracy: true}

    watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    btnStart.classList.add("d-none");
    btnStop.classList.remove("d-none");
})

btnStop.addEventListener("click", ()=>{

    navigator.geolocation.clearWatch(watchID)
    watchID = null

    speedElement.innerText = 0;

    btnStart.classList.remove("d-none");
    btnStop.classList.add("d-none");
})