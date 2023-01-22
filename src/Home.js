import React, { useEffect, useState } from 'react';

export function Home() {
  const [country, setCountry] = useState('Japan');
  const [countryData, setCountryData] = useState('');
  const [countryPhoto, setCountryPhoto] = useState('');

  // sets data on current country in state
  async function fetchCountry() {
    const response = await fetch(
      `https://restcountries.com/v2/name/${country}?fields=name,capital,region,population`
    );
    const json = await response.json();
    setCountryData(json[0]);
  }

  // grabs photo url via Netlify Functions
  // uses country stored in state as query parameter
  async function fetchPhoto() {
    const response = await fetch(
      `/.netlify/functions/auth-fetch?country=${country}`
    );
    const json = await response.json();
    if (json.results[0].urls.regular !== 0) {
      setCountryPhoto(json.results[8].urls.regular);
    }
  }

  function adjustCountry(event) {
    setCountry(event.target.value);
  }

  useEffect(() => {
    fetchCountry();
    fetchPhoto();
  }, [country]);

  return (
    <div>
      <div className="text-center bg-2 py-4 mb-6">
        <div className="md:grid md:grid-cols-2 md:gap-2">
          <div className="">
            <h1 className="text-8xl mt-4 font-bold">Welcome</h1>
            <h2 className="text-6xl font-semibold mb-6">This is WorldInfo</h2>
            <h4 className="text-2xl font-semibold">
              The world is vast and ready to be explored. <br /> Where will you
              go?
            </h4>
            <button className="border-2 border-white p-4 rounded-xl mt-4">
              Explore Now
            </button>
          </div>
          <div className="">
            <img
              className="rounded-xl pr-24"
              src="https://images.unsplash.com/photo-1673901736622-c3f06b08511f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
            />
          </div>
        </div>
      </div>
      <div className="py-4 text-center text-white bg-1">
        <h3>Popular countries this week:</h3>
        <div className="mb-2 font-semibold">
          <button
            className="mr-2 hover:underline"
            onClick={adjustCountry}
            value="USA"
          >
            United States
          </button>
          <button
            className="mr-2 hover:underline"
            onClick={adjustCountry}
            value="Japan"
          >
            Japan
          </button>
          <button
            className="mr-2 hover:underline"
            onClick={adjustCountry}
            value="Ukraine"
          >
            Ukraine
          </button>
          <button
            className="mr-2 hover:underline"
            onClick={adjustCountry}
            value="Taiwan"
          >
            Taiwan
          </button>
          <button
            className="hover:underline"
            onClick={adjustCountry}
            value="Chile"
          >
            Chile
          </button>

          <label>
            <h3 className="mt-4">Search your own</h3>
            <input
              defaultValue={country}
              className="rounded-xl text-black p-4 text-center"
            ></input>
          </label>
        </div>
        <div className="py-4">
          <h3 className="text-4xl font-light">Featured Country</h3>
          <h2 className="text-6xl font-bold mb-4">{country}</h2>
          <div className="flex justify-center align-middle">
            <img className="rounded-xl w-7/12" src={countryPhoto} />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-6xl font-semibold my-4">Quick Facts</h2>
          <h3 className="text-4xl font-bold mb-2">
            <span className="font-light">Region:</span> {countryData.region}
          </h3>
          <h3 className="text-4xl mb-2 font-bold">
            <span className="font-light">Capital:</span> {countryData.capital}
          </h3>
          <h3 className="text-4xl font-bold">
            <span className="font-light">Population:</span>{' '}
            {countryData.population}
          </h3>
        </div>
      </div>
    </div>
  );
}
