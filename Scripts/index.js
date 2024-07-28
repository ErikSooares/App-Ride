const rideListELement = document.querySelector("#ridelist");
const allRides = getAllRides()

allRides.forEach(async ([id, value]) => {

    const ride = JSON.parse(value)
    ride.id = id

    const itemElement = document.createElement("li");
    itemElement.id = ride.id;
    itemElement.className = "d-flex p-3 align-items-center justify-content-between shadow-sm gap-3"
    rideListELement.appendChild(itemElement)

    itemElement.addEventListener("click", () => {
        window.location.href = `./detail.html?id=${ride.id}`
    })

    const firstPosition = ride.data[0];
    const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

    const mapId = `map${ride.id}`;
    const mapElement = document.createElement("div")
    mapElement.id = mapId
    mapElement.style = "width: 150px; height: 150px";
    mapElement.classList.add("bg-secondary")
    mapElement.classList.add("rounded-4")

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

    itemElement.appendChild(mapElement)
    itemElement.appendChild(dataElement)

    const map = L.map(mapId, {zoomControl: false, dragging: false, attributionControl: false, scrollWheelZoom: false})
    map.setView([firstPosition.latitude, firstPosition.longitude], 12)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
})