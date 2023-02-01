import React, { useEffect, useState } from "react";

export function Home() {
  const [country, setCountry] = useState("Japan");
  const [countryData, setCountryData] = useState("");
  const [countryPhoto, setCountryPhoto] = useState("");
  const [countrySearch, setCountrySearch] = useState("");

  // restricts search parameters because of the Unsplash API Limit
  const acceptedCountries = [
    "Australia",
    "Argentina",
    "China",
    "Germany",
    "India",
    "Botswana",
    "Lithuania",
    "New Zealand",
    "South Korea",
  ];

  const randomList = [
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Luxembourg",
    "Macau",
    "Malaysia",
    "Madagascar",
    "New Zealand",
    "Namibia",
    "Kenya",
    "Nepal",
    "Netherlands",
    "Vietnam",
  ];

  // sets data on current country in state
  async function fetchCountry() {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}?fullText=true?fields=name,capital,region,population`
    );
    const json = await response.json();

    json.forEach((countryItem) => {
      if (countryItem.name.common === country) {
        setCountryData(countryItem);
      }
    });
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

  function searchCountry() {
    const captializedCountrySearch = countrySearch
      .split(/ /g)
      .map(
        (word) => `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`
      )
      .join(" ");
    if (acceptedCountries.includes(captializedCountrySearch)) {
      setCountry(captializedCountrySearch);
      setCountrySearch("");
    }
  }

  function searchOnEnter(event) {
    if (event.key === "Enter") {
      searchCountry();
    }
  }

  function searchRandom() {
    let randomCountry =
      randomList[Math.floor(Math.random() * randomList.length)];
    if (randomCountry === country) {
      randomCountry = randomList[Math.floor(Math.random() * randomList.length)];
    }
    setCountry(randomList[Math.floor(Math.random() * randomList.length)]);
  }

  useEffect(() => {
    fetchCountry();
    fetchPhoto();
  }, [country]);

  return (
    <div>
      <div className="text-center text-white bg-gray-700 py-4 mb-6">
        <div className="md:grid md:grid-cols-2 md:gap-2">
          <div className="">
            <h1 className="text-6xl md:text-8xl mt-4 font-bold">Welcome</h1>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">
              This is WorldInfo
            </h2>
            <h4 className="text-xl md:text-2xl font-semibold mb-4">
              The world is vast and ready to be explored. <br /> Where will you
              go?
            </h4>
            <button className="border-2 border-white p-4 rounded-xl mt-4 mb-4 md:mb-0">
              Explore Now
            </button>
          </div>
          <div className="flex justify-center align-middle">
            <img
              className="rounded-xl w-10/12 md:w-11/12"
              src="https://images.unsplash.com/photo-1673901736622-c3f06b08511f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
            />
          </div>
        </div>
      </div>
      <div className="py-4 text-center dark:text-white bg-1">
        <div>
          <h3>Popular countries this week:</h3>
          <div className="mb-2 font-semibold">
            <button
              className="mr-2 hover:underline"
              onClick={adjustCountry}
              value="United States"
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
          </div>

          <label className="">
            <h2 className="my-4 text-4xl md:text-6xl font-bold">
              Search your own
            </h2>
            <h5 className="font-light text-lg md:text-xl">
              Disclaimer: due to Unsplash API limits, search queries are
              restricted to the following:
            </h5>
            <h5 className="mb-4 font-bold text-lg md:text-xl px-2">
              Australia, Argentina, Botswana, China, Germany, Lithuania, and
              South Korea.
            </h5>
            <input
              value={countrySearch}
              className="rounded-lg text-black p-4 text-center shadow-lg shadow-sky-500/40"
              onChange={(e) => setCountrySearch(e.target.value)}
              onKeyDown={searchOnEnter}
            ></input>
          </label>
          <button
            className="border-2 border-black bg-sky-600 rounded-xl 
                        p-2 ml-4 text-2xl font-bold"
            onClick={searchCountry}
          >
            Search
          </button>
          <button
            className="border-2 border-black bg-sky-600 rounded-xl 
                        p-2 mt-4 md:mt-0 ml-4 inline-block text-2xl font-bold"
            onClick={searchRandom}
          >
            Feeling Lucky
          </button>
        </div>
        <div className="pt-8">
          <div className="flex justify-center align-middle">
            <img className="rounded-xl w-10/12 md:w-8/12" src={countryPhoto} />
          </div>
        </div>
        <div className="flex justify-center align-middle md:-mt-20 -mt-10 mb-8">
          <div
            className="bg-sky-100 text-sky-700
                          md:p-6 py-6 px-20 rounded-xl border-1 border-sky-200 
                          space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold">{country}</h2>
            <div className="md:flex md:justify-center md:align-middle md:space-x-16">
              <h3 className="text-3xl md:text-4xl mb-2 font-semibold">
                <span className="font-light">Capital</span> <br />
                {countryData.capital}
              </h3>
              <h3 className="text-3xl md:text-4xl mb-2 font-semibold">
                <span className="font-light">Population</span> <br />
                {countryData.population}
              </h3>
              <h3 className="text-3xl md:text-4xl font-semibold mb-2">
                <span className="font-light">Region</span> <br />{" "}
                {countryData.region}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
