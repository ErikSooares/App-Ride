const speedElement = document.querySelector("#speed");
const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");

btnStart.addEventListener("click", ()=>{

    function handleSuccess(position){
        if(position.coords.speed == null){
            speedElement.innerText = 0;
        }
        else{
            speedElement.innerText = parseInt(position.coords.speed) * 3.6;
        }
        console.log(position)
    }

    function handleError(position){
        console.log(error.msg)
    }

    const options = {enableHighAccuracy: true}

    navigator.geolocation.watchPosition(handleSuccess, handleError, options)

    btnStart.classList.add("d-none");
    btnStop.classList.remove("d-none");
})

btnStop.addEventListener("click", ()=>{
    btnStart.classList.remove("d-none");
    btnStop.classList.add("d-none");
})