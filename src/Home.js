import React, { useEffect, useState } from "react";
import Select from "react-select";

export function Home() {
  const [country, setCountry] = useState("Japan");
  const [countryData, setCountryData] = useState("");
  const [countryPhoto, setCountryPhoto] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const wikiVoyageURL = `https://en.wikivoyage.org/wiki/${country}`;

  // restricts search parameters because of the Unsplash API Limit
  const acceptedCountries = [
    { value: "Australia", label: "Australia" },
    { value: "Argentina", label: "Argentina" },
    { value: "China", label: "China" },
    { value: "Germany", label: "Germany" },
    { value: "India", label: "India" },
    { value: "Botswana", label: "Botswana" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Mexico", label: "Mexico" },
    { value: "Norway", label: "Norway" },
  ];

  const acceptedCountriesArr = [
    "Australia",
    "Argentina",
    "China",
    "Germany",
    "India",
    "Botswana",
    "Lithuania",
    "Mexico",
    "Norway",
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
      setCountryPhoto(json.results[0].urls.regular);
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
    if (acceptedCountriesArr.includes(captializedCountrySearch)) {
      setCountry(captializedCountrySearch);
      console.log(captializedCountrySearch);
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
      console.log(randomCountry, country);
      randomCountry = randomList[Math.floor(Math.random() * randomList.length)];
      console.log(randomCountry, country);
    }
    setCountry(randomCountry);
  }

  useEffect(() => {
    fetchCountry();
    fetchPhoto();
  }, [country, countrySearch]);

  return (
    <div>
      <div className="text-center text-white bg-gray-700 py-4 mb-6">
        <div className="md:grid md:grid-cols-2 md:gap-2">
          <div className="">
            <h1 className="text-6xl md:text-8xl mt-4 font-bold">Welcome</h1>
            <h2 className="text-4xl md:text-6xl font-semibold mb-6">
              to <span className="text-blue-500">World</span><span className="text-lime-500">Info</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              The world is vast and ready to be explored. <br /> Where will you
              go?
            </h3>
            <button className="border-2 border-sky-500 p-4 rounded-xl mt-4 mb-4 md:mb-0 hover:bg-sky-400">
              <a href="#search">Explore Now</a>
            </button>
          </div>
          <div className="flex justify-center align-middle">
            <img
              className="rounded-xl w-10/12 md:w-11/12"
              alt="Featured photo of Switzerland winter"
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

          <label id="search">
            <h2 className="my-4 text-4xl md:text-6xl font-bold">
              Explore
            </h2>
            <h3 className="font-light text-lg md:text-xl mb-2">
              Disclaimer: due to Unsplash API limits, search queries are
              restricted.
            </h3>
            {/* <input
              value={countrySearch}
              className="rounded-lg text-black p-4 text-center shadow-lg shadow-sky-500/40"
              onChange={(e) => setCountrySearch(e.target.value)}
              onKeyDown={searchOnEnter}
            ></input> */}
            <div className="flex justify-center align-middle mb-4">
              <Select
                options={acceptedCountries}
                onChange={(e) => setCountrySearch(e.value)}
                onKeyDown={searchOnEnter}
                className="text-black w-1/2"
                isSearchable={false}
              />
            </div>
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
            Random
          </button>
        </div>
        <div className="pt-8">
          <div className="flex justify-center align-middle">
            <img
              className="rounded-xl md:w-8/12"
              src={countryPhoto}
              alt={"photo of " + country}
              loading="lazy"
            ></img>
          </div>
        </div>
        <div className="flex justify-center align-middle md:-mt-20 -mt-10 mb-8">
          <div
            className="bg-sky-100 text-sky-700
                          md:px-24 py-6 px-20 rounded-xl border-1 border-sky-200 
                          space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold">{country}</h2>
            <div className="md:flex md:justify-center md:align-middle md:space-x-16">
              <h3 className="text-3xl md:text-4xl mb-2 font-semibold">
                <span className="font-light text-sky-600">Capital</span> <br />
                {countryData.capital}
              </h3>
              <h3 className="text-3xl md:text-4xl mb-2 font-semibold">
                <span className="font-light text-sky-600">Population</span>{" "}
                <br />
                {countryData.population}
              </h3>
              <h3 className="text-3xl md:text-4xl font-semibold mb-2">
                <span className="font-light text-sky-600">Region</span> <br />{" "}
                {countryData.region}
              </h3>
            </div>
            <h5 className="text-lg">
              <a
                href={wikiVoyageURL}
                className="hover:underline"
                target="_blank"
              >
                Wikivoyage
              </a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
