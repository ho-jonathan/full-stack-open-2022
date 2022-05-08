import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ data }) => {
  const { name, capital, area, population, flags, languages } = data
  const [weather, setWeather] = useState({})
  const [logo, setLogo] = useState('')
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/forecast?q=
        ${capital[0]}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data.list[0])
        setLogo(`http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`)
      })
  }, [capital])

  return (
    <>
      <h1>{name.common}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <br />
      <strong>languages:</strong>
      <ul>
        {Object.values(languages).map((language) =>
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={flags['svg']} alt={name.common} width="100px" />
      <h3>Weather in {capital}</h3>
      {Object.keys(weather).length !== 0 && (
        <>
          <p>temperature {weather.main.temp} K</p>
          <img 
            src={logo}
            alt={weather.description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  )
}

function App() {
  const [filterValue, setFilterValue] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [displayCountry, setDisplayCountry] = useState({})

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  useEffect(() => {
    setDisplayCountry(filteredCountries.length === 1 ?
      filteredCountries[0]
      :
      {}
    )
  }, [filteredCountries])

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
    setFilteredCountries(
      allCountries.filter((country) => 
        country.name.common.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      )
    )
  }

  const showCountries = () => {
    return (
      filteredCountries.length !== 1 &&
      filteredCountries.map((country) =>
        <p key={country.name.common}>
          {country.name.common}{' '}
          <button onClick={() => setDisplayCountry(country)}>
            show
          </button>
        </p>
      )
    )
  }
  return (
    <>
      <p>
        find countries{' '}
        <input value={filterValue} onChange={handleFilterChange} />
      </p>
      {filteredCountries.length > 10 ?
        <p>Too many matches, specify another filter</p>
        :
        showCountries()
      }
      {displayCountry.name  && <Country data={displayCountry} />}
    </>
  )
}

export default App;
