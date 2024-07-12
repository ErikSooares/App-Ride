function createNewRide() {

    const RideID = Date.now();
    const RideRecord = {
        data: [],
        startTime: RideID,
        stopTime: null
    }

    saveRideRecord(RideID, RideRecord);
    return RideID;

}

function getAllRides(){
    return Object.entries(localStorage)
}

function getRideRecord(RideID) {
    return JSON.parse(localStorage.getItem(RideID));
}

function saveRideRecord(RideID, RideRecord){
    localStorage.setItem(RideID, JSON.stringify(RideRecord));
}

function addPosition(RideID, position) {
    const RideRecord = getRideRecord(RideID);
    const NewData = {
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        timestamp: position.timestamp
    }
    RideRecord.data.push(NewData);
    saveRideRecord(RideID, RideRecord);
}

function updateStopTime(RideID){
    const RideRecord = getRideRecord(RideID);
    RideRecord.stopTime = Date.now()
    saveRideRecord(RideID, RideRecord);
}