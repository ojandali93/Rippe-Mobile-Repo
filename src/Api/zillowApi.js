import authorized from '../../Authorize'

const properties = {
  method: 'GET',
  url: 'https://zillow56.p.rapidapi.com/search',
  params: {location: 'Los Angeles, CA',
          isSingleFamily: 'true',
          isMultiFamily: 'true',
          isApartment: 'true',
          isCondo: 'true',
          isManufactured: 'false',
          isTownhouse: 'true',
          isLotLand: 'false'},
  headers: {
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

const singleProperty = {
  method: 'GET',
  url: 'https://zillow56.p.rapidapi.com/property',
  params: {zpid: '7594920'},
  headers: {
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

const GeneralAnalysis = {
  method: 'GET',
  url: 'https://mashvisor-api.p.rapidapi.com/rental-rates',
  params: {
    source: 'airbnb'
  },
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

const cityTrends = {
  method: 'GET',
  url: 'https://mashvisor-api.p.rapidapi.com/trends/summary/FL/Miami%20Beach',
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

const rentalRatesA = {
  method: 'GET',
  url: 'https://mashvisor-api.p.rapidapi.com/rental-rates',
  params: {
    state: 'CA',
    source: 'airbnb',
    city: 'Los Angeles',
  },
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

const rentalRatesT = {
  method: 'GET',
  url: 'https://mashvisor-api.p.rapidapi.com/rental-rates',
  params: {
    state: 'CA',
    source: 'traditional',
    city: 'Los Angeles',
  },
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

const topRatedHomes = {
  method: 'GET',
  url: 'https://mashvisor-api.p.rapidapi.com/airbnb-property/top-reviewed',
  params: {
    reviews_count: '30',
    page: '1'
  },
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

const newlyLlisted = {
  method: 'GET',
  url: 'https://mashvisor-api.p.rapidapi.com/airbnb-property/newly-listed',
  params: {
    page: '1'
  },
  headers: {
    'content-type': 'application/octet-stream',
    'X-RapidAPI-Key': authorized.ZILLOW_API_KEY,
    'X-RapidAPI-Host': authorized.ZILLOW_API_HOST
  }
};

module.exports = {properties, singleProperty, 
  GeneralAnalysis, cityTrends, rentalRatesA,
  rentalRatesT, topRatedHomes, newlyLlisted}