const speedElement = document.querySelector("#speed");
const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");

btnStart.addEventListener("click", ()=>{
    btnStart.classList.add("d-none");
    btnStop.classList.remove("d-none");
})

btnStop.addEventListener("click", ()=>{
    btnStart.classList.remove("d-none");
    btnStop.classList.add("d-none");
})