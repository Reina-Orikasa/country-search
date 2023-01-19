import React, { useEffect, useState } from "react";

export function Home() {
  const [countryData, setCountryData] = useState("");
  async function fetchCountry() {
    const response = await fetch(
      "https://restcountries.com/v2/name/switzerland?fields=name,capital,region,population"
    );
    const json = await response.json();
    setCountryData(json[0]);
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  return (
    <div>
      <div className="text-center bg-1 py-4">
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

          <img
            className="rounded-xl pr-24"
            src="https://images.unsplash.com/photo-1673901736622-c3f06b08511f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80"
          />
        </div>
      </div>
      <div className="py-4 text-center text-white h-full">
        <h3 className="text-4xl font-light">Featured Country</h3>
        <h2 className="text-6xl font-bold mb-4">Switzerland</h2>
        <div className="flex justify-center align-middle bg-2">
          <img
            className="rounded-xl w-2/3"
            src="https://images.unsplash.com/photo-1521292270410-a8c4d716d518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          />
        </div>

        <h2 className="text-6xl font-semibold mt-4">Quick Facts</h2>
        <h3 className="text-4xl">Region: {countryData.region}</h3>
        <h3 className="text-4xl">Capital: {countryData.capital}</h3>
        <h3 className="text-4xl">Population: {countryData.population}</h3>
      </div>
    </div>
  );
}
