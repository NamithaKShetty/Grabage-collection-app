import React, { useState } from 'react';

const ServicePage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    flatNumber: '',
    streetName: '',
    wasteType: '',
    weight: '',
  });
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.date || !formData.time) {
        setError('Please select both date and time');
      } else {
        setError('');
        setStep(step + 1);
      }
    } else if (step === 2) {
      if (!formData.location || !formData.flatNumber || !formData.streetName) {
        setError('Please enter location details, flat number, and street name');
      } else {
        setError('');
        setStep(step + 1);
      }
    }
  };

  const handleConfirm = async () => {
    if (!formData.wasteType || !formData.weight) {
      setError('Please enter waste type and weight');
    } else {
      setError('');
      try {
        const response = await fetch('http://localhost:4001/service', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Request submitted:', data);
          setConfirmation(true);
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        console.error('Error submitting request:', error);
        setError('Error submitting request');
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      date: '',
      time: '',
      location: '',
      flatNumber: '',
      streetName: '',
      wasteType: '',
      weight: '',
    });
    setConfirmation(false);
    setError('');
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setFormData({
            ...formData,
            location: `Latitude: ${latitude}, Longitude: ${longitude}`,
          });
        },
        (error) => {
          console.error('Error getting current location:', error);
          setError('Error getting current location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    try {
      // Replace with your preferred geocoding API endpoint
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data.features);
    } catch (error) {
      console.error('Error searching location:', error);
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (selectedLocation) => {
    setFormData({
      ...formData,
      location: selectedLocation.place_name,
    });
    setSearchResults([]);
  };

  if (confirmation) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f0f0f0',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Confirmation view */}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'white',
          padding: '30px 50px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <header style={{ marginBottom: '30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', color: '#2d6a4f' }}>Trash Pickup Request</h1>
        </header>
        <div style={{ display: step === 1 ? 'block' : 'none' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>Step 1: Select Date and Time</h2>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleNext}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2d6a4f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Next
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
        <div style={{ display: step === 2 ? 'block' : 'none' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>Step 2: Enter Location Details</h2>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={(e) => {
              handleChange(e);
              setSearchTerm(e.target.value);
            }}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={getCurrentLocation}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2d6a4f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Get Current Location
          </button>
          <div>
            {searchResults.length > 0 && (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {searchResults.map((result) => (
                  <li
                    key={result.id}
                    onClick={() => handleSelectLocation(result)}
                    style={{
                      padding: '10px',
                      marginBottom: '5px',
                      borderRadius: '5px',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      backgroundColor: '#f0f0f0',
                    }}
                  >
                    {result.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          <input
            type="text"
            placeholder="Flat Number"
            name="flatNumber"
            value={formData.flatNumber}
            onChange={handleChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="text"
            placeholder="Street Name"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleNext}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2d6a4f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Next
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
        <div style={{ display: step === 3 ? 'block' : 'none' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#333' }}>
            Step 3: Enter Waste Details and Confirm Order
          </h2>
          <input
            type="text"
            placeholder="Type of Waste"
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="number"
            placeholder="Weight in kg"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={handleConfirm}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2d6a4f',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Confirm Order
          </button>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;

