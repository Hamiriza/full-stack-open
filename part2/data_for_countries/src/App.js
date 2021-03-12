import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState([]);
  const [capitalCity, setCapitalCity] = useState("Jakarta");

  const getData = () =>
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setAllCountries(response.data);
    });

  const filterData = () => {
    const regex = new RegExp(filter, "i");
    const result = allCountries.filter((country) => country.name.match(regex));
    setCountries(result);
  };

  const getWeather = () =>
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capitalCity}`
      )
      .then((response) => setWeather(response.data));

  useEffect(getData, []);
  useEffect(filterData, [filter, allCountries]);
  useEffect(getWeather, [capitalCity]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const showCountry = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const handleCountryChange = (capital) => setCapitalCity(capital);

  return (
    <div>
      <Filter value={filter} onChange={handleFilter} />
      <Countries
        countries={countries}
        showCountry={showCountry}
        allCountries={allCountries}
        weather={weather}
        handleCountryChange={handleCountryChange}
      />
    </div>
  );
}

export default App;
