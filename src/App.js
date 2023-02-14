import React, { Component } from 'react'
import Country from './components/Country';
import './App.css';
import { Typography, Box, Button, Container } from '@mui/material';
import NewCountry from './components/NewCountry';

class App extends Component {
  state = {
    countries: [
      {
        id: 1, name: 'United States', countryTotal: 8, medals: [
          { type: 'Bronze', total: 2 },
          { type: 'Silver', total: 2 },
          { type: 'Gold', total: 4 },
        ]
      },
      {
        id: 2, name: 'China', countryTotal: 7, medals: [
          { type: 'Bronze', total: 2 },
          { type: 'Silver', total: 3 },
          { type: 'Gold', total: 2 },
        ]
      },
      {
        id: 3, name: 'Germany', countryTotal: 4, medals: [
          { type: 'Bronze', total: 1 },
          { type: 'Silver', total: 3 },
          { type: 'Gold', total: 0 },
        ]
      },
    ],
    combinedTotal: 19

  }

  changeMedal = (countryName, medalType, value) => {
    // instantiates a new combinedTotal
    let combinedTotalMutable = this.state.combinedTotal
    // instantiates a new list of countries
    let countriesMutable = this.state.countries;
    // determines proper country index
    let countryIdx = countriesMutable.findIndex(country => country.name === countryName);
    // instantiates the country from the list
    let countryMutable = countriesMutable[countryIdx];
    // gets the medal index for the specific medal interacted with
    let medalsIdx = countryMutable.medals.findIndex(medal => medal.type === medalType);
   
    if (countryMutable.medals[medalsIdx].total > 0 || value === 1){
      countryMutable.medals[medalsIdx].total += value;
      this.setState({ medals: countryMutable.medals });

      if (countryMutable.countryTotal > 0 || value === 1){
        countryMutable.countryTotal += value;
        this.setState({ countryTotal: countryMutable.countryTotal});
      }

      if (combinedTotalMutable > 0 || value === 1){
        combinedTotalMutable += value;
        this.setState({ combinedTotal: combinedTotalMutable});
      }
    }
    localStorage.setItem('countries', JSON.stringify(this.state.countries));
    localStorage.setItem('combinedTotal', JSON.stringify(this.state.combinedTotal));
  }
  
  componentDidMount() {
    let storedCountries = localStorage.getItem('countries');
    
    let storedCombinedTotals = localStorage.getItem('combinedTotal');
    
    if (storedCountries) {
      this.setState({ countries: (JSON.parse(storedCountries)) });
    }
    if (storedCombinedTotals) {
      this.setState({ combinedTotal: JSON.parse(storedCombinedTotals) });
    }
  }

  clearLocalStorage() {
    localStorage.clear()
    window.location.reload()
  }


  render() {
    return (
      <div className="App">

      <Box sx={{
        height: 50,
        backgroundColor: 'primary.dark',
        alignItems: 'center',
        justifyContent: "center",
        display: "flex",
      }}>
        <Typography fontWeight="fontWeightBold" variant="h5" component="div" sx={{ color: '#000000' }}>
              Olympic Medals {this.state.combinedTotal}
        </Typography>
      

      </Box>

        <Container>
          {this.state.countries.map((country) =>
            <Country
              key={country.id}
              id={country.id}
              name={country.name}
              medals={country.medals}
              countryTotal={country.countryTotal}
              changeMedal={this.changeMedal}
            />)}
        </Container>
        <Button elevation={10} variant="contained" color="primary" onClick={this.clearLocalStorage}>Reset All</Button>
        <NewCountry onAdd={ this.handleAdd } />
      </div>
    );
  }
}

export default App;
