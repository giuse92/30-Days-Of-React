import React, {useContext } from 'react'
import ReactDOM from 'react-dom'
import useFetch from './useFetch'

const MyContext = React.createContext();

const MyProvider = (props) => {
  const url = 'https://restcountries.eu/rest/v2/all'
  const data = useFetch(url)

  return <MyContext.Provider value={data}>{props.children}</MyContext.Provider>
}

const Country = (props) => {
  const context = useContext(MyContext);

  return (
    context.map((country, i) => (
      <div key={`country-n-${i}`} className='country'>
        <div className='country_flag'>
          <img src={country.flag} alt={country.name} />
        </div>
        <h3 className='country_name'>{country.name.toUpperCase()}</h3>
        <div className='country_text'>
          <p>
            <span>Population: </span>
            {country.population}
          </p>
        </div>
      </div>
    ))
  )
}

const App = (props) => {

  return (
    <MyProvider>
      <div className='App'>
        <h1>Custom Hooks</h1>
        <h1>Calling API</h1>
        <div>
          <MyContext.Consumer>
            {context => (
              <p>There are {context.length} countries in the api</p>
            )
            }
          </MyContext.Consumer>
          <Country />          
        </div>
      </div>
    </MyProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
