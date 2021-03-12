import React from "react";

function OneCountry({ country, weather }) {
  const { name, capital, population, languages, flag } = country;
  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map((language, index) => (
          <li key={index}>{language.name}</li>
        ))}
      </ul>
      <img src={flag} width={200} height={200} alt={`flag of ${name}`} />
      <h2>Weather in {capital}</h2>
      <p>
        <b>temperature: </b> {weather["current"].temperature} Celcius
      </p>
      <img src={weather["current"].weather_icons[0]} alt="weather icons" />
      <p>
        <b>wind: </b> {weather["current"].wind_speed} kph direction{" "}
        {weather["current"].wind_dir}
      </p>
    </div>
  );
}

export default OneCountry;
