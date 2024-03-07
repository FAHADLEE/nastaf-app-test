/* global google */

import axios from 'axios';
import { APIURL } from "../../../url";

let map;
let directionsService;
let directionsRenderer;
let startMarker;
let endMarker;
let searchBox;
let popup;
let waypoints = [];

const apiUrl = APIURL;


function initMap() {
    try {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: 13.0827, lng: 80.2707 },
        });
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);
        map.addListener('click', (event) => {
            handleMapClick(event.latLng);
        });
        const input = document.getElementById('pac-input');
        searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards the current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        searchBox.addListener('places_changed', function () {
            const places = searchBox.getPlaces();
            if (places.length === 0) {
                return;
            }
            const bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log('Returned place contains no geometry');
                    return;
                }
                createMarker(place.geometry.location, place.name);
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
        window.map = map;
    } catch (error) {
        console.error('Error initializing map:', error);
    }
}

function submitPopup() {
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const tripTypeElement = document.getElementById('tripType');
    const placeName = document.getElementById('placeName').value;
    const tripid = localStorage.getItem('selectedTripid');
    if (!date || !time || !tripTypeElement) {
        alert('Please fill in all required fields.');
        return;
    }
    const selectedTripType = tripTypeElement.value;
    fetch(`http://${apiUrl}/gmap-submitForm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, time, tripType: selectedTripType, placeName, tripid }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Server response:', data);
            // Handle the response as needed
        })
        .catch(error => console.error('Error:', error));
    popup.close();
    if (selectedTripType === 'start') {
        startMarker = createMarker(popup.getPosition(), 'A', date, time, selectedTripType, placeName);
    } else if (selectedTripType === 'end') {
        if (waypoints.length > 0) {
            const lastWaypointLabel = waypoints[waypoints.length - 1].label;
            const nextEndLabel = getNextAlphabeticLetter(lastWaypointLabel);
            endMarker = createMarker(popup.getPosition(), nextEndLabel, date, time, selectedTripType, placeName);
            document.getElementById('end').value = placeName;
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        } else {
            endMarker = createMarker(popup.getPosition(), 'B', date, time, selectedTripType, placeName);
            document.getElementById('end').value = placeName;
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
    } else if (selectedTripType === 'waypoint') {
        const waypointLabel = getNextWaypointLabel();
        const waypointMarker = createMarker(popup.getPosition(), waypointLabel, date, time, selectedTripType, placeName);
        waypoints.push(waypointMarker);
        if (startMarker && endMarker) {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        }
    }
}

function getNextAlphabeticLetter(currentLetter) {
    return String.fromCharCode(currentLetter.charCodeAt(0) + 1);
}

function getNextWaypointLabel() {
    const lastWaypointLabel = waypoints.length > 0 ? waypoints[waypoints.length - 1].label : 'A';
    const nextCharCode = lastWaypointLabel.charCodeAt(0) + 1;
    return String.fromCharCode(nextCharCode);
}

function handleMapClick(latLng) {
    const geocoder = new google.maps.Geocoder();
    const popupContent = document.createElement('div');
    popupContent.innerHTML = `
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" value='' required /><br/>
            <label for="time">Time:</label>
            <input type="time" id="time" name="time" value='' required /><br/>
            <label for="tripType">Trip Type:</label>
            <select id="tripType" name="tripType" value=''>
                <option value="start">Start</option>
                <option value="end">End</option>
                <option value="waypoint">Waypoint</option>
            </select><br/>
            <input type="hidden" id="placeName" name="placeName" value="" disabled />
            <button id="submitButton">Submit</button>
        `;
    popup = new google.maps.InfoWindow({
        content: popupContent,
        position: latLng,
    });
    popup.open(map);
    geocoder.geocode({ location: latLng }, (results, status) => {
        console.log('Geocoding Results:', results);
        console.log('Geocoding Status:', status);
        if (status === 'OK' && results[0]) {
            const placeName = results[0].formatted_address;
            const placeNameElement = document.getElementById('placeName');
            if (placeNameElement) {
                placeNameElement.value = placeName;
            } else {
                console.error("Element with ID 'placeName' not found");
            }
            const submitButton = document.getElementById('submitButton');
            if (submitButton) {
                submitButton.addEventListener('click', submitPopup);
            } else {
                console.error("Element with ID 'submitButton' not found");
            }
        }
    });
}

function createMarker(position, label) {
    return new google.maps.Marker({
        position: position,
        map: map,
        label: label,
    });
}

function clearMarkers() {
    if (startMarker) {
        startMarker.setMap(null);
    }
    if (endMarker) {
        endMarker.setMap(null);
    }
    for (const waypoint of waypoints) {
        waypoint.setMap(null);
    }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    clearMarkers();
    const waypointsPositions = waypoints.map((waypoint) => ({
        location: waypoint.getPosition(),
        stopover: true,
    }));
    if (startMarker && endMarker) {
        const startLocation = startMarker.getPosition();
        const endLocation = endMarker.getPosition();
        directionsService
            .route({
                origin: startLocation,
                destination: endLocation,
                waypoints: waypointsPositions,
                travelMode: google.maps.TravelMode.DRIVING,
            })
            .then((response) => {
                directionsRenderer.setDirections(response);
            })
            .catch((e) => window.alert('Directions request failed due to ' + e));
    }
}

function generateStaticMap() {
    const mapCenter = map.getCenter().toJSON();
    // Sort waypoints based on the label
    const sortedWaypoints = waypoints.slice().sort((a, b) => {
        return a.order - b.order || a.label.localeCompare(b.label);
    });
    // Add markers to the static map URL
    const markers = [];
    if (startMarker) {
        markers.push(`markers=color:red%7Clabel:A%7C${startMarker.getPosition().lat()},${startMarker.getPosition().lng()}`);
    }
    if (endMarker) {
        // Check if there are waypoints
        if (waypoints.length > 0) {
            // If waypoints exist, use the last waypoint label
            const lastWaypointLabel = sortedWaypoints[sortedWaypoints.length - 1].label;
            const nextEndLabel = String.fromCharCode(lastWaypointLabel.charCodeAt(0) + 1);
            markers.push(`markers=color:red%7Clabel:${nextEndLabel}%7C${endMarker.getPosition().lat()},${endMarker.getPosition().lng()}`);
        } else {
            // If no waypoints, use 'B'
            markers.push(`markers=color:red%7Clabel:B%7C${endMarker.getPosition().lat()},${endMarker.getPosition().lng()}`);
        }
    }
    // Calculate route using Directions API
    const directionsService = new google.maps.DirectionsService();
    if (startMarker && endMarker) {
        const startLocation = startMarker.getPosition();
        const endLocation = endMarker.getPosition();
        const waypointsPositions = sortedWaypoints.map((waypoint) => ({
            location: waypoint.getPosition(),
            stopover: true,
        }));
        directionsService.route({
            origin: startLocation,
            destination: endLocation,
            waypoints: waypointsPositions,
            travelMode: google.maps.TravelMode.DRIVING,
        }, async (response, status) => {
            if (status === 'OK') {
                // Extract polylines from Directions API response
                const routePolyline = response.routes[0].overview_polyline;
                // Add markers for waypoints to the static map URL
                for (let i = 0; i < sortedWaypoints.length; i++) {
                    const label = sortedWaypoints[i].label;
                    markers.push(`markers=color:red%7Clabel:${label}%7C${sortedWaypoints[i].getPosition().lat()},${sortedWaypoints[i].getPosition().lng()}`);
                }
                // Create an array of LatLng objects for all markers and route
                const allPositions = [startLocation, endLocation, ...waypointsPositions.map(waypoint => waypoint.location)];
                const bounds = new google.maps.LatLngBounds();
                // Extend the bounds for each position
                allPositions.forEach(position => bounds.extend(position));
                // Fit the map to the bounds
                map.fitBounds(bounds);
                const zoom = calculateZoomLevel(bounds);
                const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=${zoom}&size=800x400&dpi=720`;
                // Add route path to the static map URL
                const pathEncoded = encodeURIComponent(`enc:${routePolyline}`);
                const pathParam = `path=${pathEncoded}`;
                // Add the API key to the static map URL (replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key)
                const apiKey = 'AIzaSyCp2ePjsrBdrvgYCQs1d1dTaDe5DzXNjYk&libraries=places';

                async function urlToBlob(url) {
                    const response = await fetch(url);
                    const blob = await response.blob();
                    return blob;
                }

                const finalStaticMapUrl = `${staticMapUrl}&${markers.join('&')}&${pathParam}&key=${apiKey}`;
                // Create a link element and trigger a download
                const staticMapBlob = await urlToBlob(finalStaticMapUrl);
                // Upload the file
                const tripid = localStorage.getItem('selectedTripid');
                const formDataUpload = new FormData();
                // formDataUpload.append('file', new File([await a.toBlob()], 'static_map.png'));
                formDataUpload.append('file', new File([staticMapBlob], 'static_map.png'));
                formDataUpload.append('tripid', tripid);

                try {
                    const response = await axios.post(`http://${apiUrl}/mapuploads`, formDataUpload, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Accept': 'image/png',
                        },
                    });
                    console.log('uploaded file details 2', response.data);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            } else {
                console.error('Directions request failed due to ' + status);
            }
        });
    }
}

// Function to calculate dynamic zoom level based on route bounds
function calculateZoomLevel(bounds) {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;
    function latRad(lat) {
        const sin = Math.sin(lat * Math.PI / 180);
        const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }
    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;
    const lngDiff = ne.lng() - sw.lng();
    const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;
    const latZoom = zoom(WORLD_DIM.height, 256, latFraction);
    const lngZoom = zoom(WORLD_DIM.width, 256, lngFraction);
    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

window.initMap = initMap;
window.handleMapClick = handleMapClick;
window.createMarker = createMarker;
window.generateStaticMap = generateStaticMap;