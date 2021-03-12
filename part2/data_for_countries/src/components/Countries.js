import React from "react";
import OneCountry from "./OneCountry";

function Countries({
  countries,
  showCountry,
  allCountries,
  weather,
  handleCountryChange,
}) {
  if (countries.length === allCountries.length) {
    return <div></div>;
  } else if (countries.length === 1) {
    setTimeout(() => handleCountryChange(countries[0].capital), 10); // might be source of problem
    return <OneCountry country={countries[0]} weather={weather} />;
  } else if (countries.length <= 10) {
    return countries.map((country) => (
      <div key={country.name}>
        <span>{country.name}</span>
        <button type="button" value={country.name} onClick={showCountry}>
          show
        </button>
        <br />
      </div>
    ));
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
}

export default Countries;
