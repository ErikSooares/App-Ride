const params = new URLSearchParams(window.location.search)
const rideId = params.get("id")
const ride = getRideRecord(rideId)

document.addEventListener("DOMContentLoaded", async () => {

    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const dataElement = document.createElement("div")
    dataElement.className = "flex-fill d-flex flex-column"

    const cityDiv = document.createElement("div");
    cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryName}`;
    cityDiv.className = "text-primary mb-2"

    const maxSpeedDiv = document.createElement("div");
    maxSpeedDiv.innerText = `Max speed: ${getMaxSpeed(ride.data)} km/h`
    maxSpeedDiv.className = "h5"

    const distanceDiv = document.createElement("div")
    distanceDiv.innerText = `Distance: ${getDistance(ride.data)} km`

    const durationDiv = document.createElement("div")
    durationDiv.innerText = `Duration: ${getDuration(ride)}`

    const dateDiv = document.createElement("div")
    dateDiv.innerText = `${getStartDate(ride)}`
    dateDiv.className = "text-secondary mt-2"

    dataElement.appendChild(cityDiv)
    dataElement.appendChild(maxSpeedDiv)
    dataElement.appendChild(distanceDiv)
    dataElement.appendChild(durationDiv)
    dataElement.appendChild(dateDiv)

    document.querySelector("#data").appendChild(dataElement)

    const map = L.map("mapDetail")
    map.setView([firstPosition.latitude, firstPosition.longitude], 15)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const positionArray = ride.data.map((position)=>{
        return [position.latitude, position.longitude]
    })

    const polyline = L.polyline(positionArray, {color: "#F00"})
    polyline.addTo(map)

    map.fitBounds(polyline.getBounds())
})

const btnDelete = document.querySelector("#btnDelete");

btnDelete.addEventListener("click", (ride) => {
    localStorage.clear(ride)
})