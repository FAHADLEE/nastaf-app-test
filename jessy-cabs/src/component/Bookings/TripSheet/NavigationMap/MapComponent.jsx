/* global google */

import React, { useEffect, useState } from 'react';
import './googleMapScript';
import PlacesAutocomplete from 'react-places-autocomplete';

const MapComponent = () => {

    const [address, setAddress] = useState('');

    useEffect(() => {
        window.initMap();
    }, []);

    const handleSelect = async (address) => {
        const geocoder = new google.maps.Geocoder();

        try {
            const results = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === 'OK' && results && results.length > 0) {
                        resolve(results);
                    } else {
                        reject(new Error('Geocode failed'));
                    }
                });
            });
            if (results[0].geometry && results[0].geometry.location) {
                const latLng = results[0].geometry.location;
                window.map.setCenter(latLng);
                window.map.setZoom(14);
                window.map.submitPopup();
            }
        } catch {
        }
    };

    const handleChange = (newAddress) => {
        setAddress(newAddress);
    };

    const generateStaticMap = () => {
        window.generateStaticMap();
    };

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="search-input-field">
                        <input
                            {...getInputProps({
                                placeholder: 'Enter location',
                            })}
                        />
                        <div>
                            {suggestions.map((suggestion, index) => (
                                <div key={index} {...getSuggestionItemProps(suggestion)}>
                                    {suggestion.description}
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <input type="hidden" id="start" />
            <input type="hidden" id="end" />
            <button onClick={generateStaticMap}>Capture Map View</button>
            <div id="map" style={{ height: '500px' }}></div>
        </div>
    );
};

export default MapComponent;