export default {
  FETCH_COUNT_PER_PAGE: 10,
  reducerPrefix: 'scooter',
  stylePrefix: 'scooter',
  SEARCH_OPTIONS: {
    caseSensitive: false,
    fuzzy: false,
    normalize: true
  },
  textinputDebounceDelay: 500,
  toastDelayLong: 3500,
  toastDelayShort: 2000,
  syncRetryDuration: 15000, // 15s
  imageMaxWidth: 660, // Api max width
  MAPS_URL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAuCCyNTsm60byIAWG0065uCoJiLNwaL0Y&libraries=places',
  zoom: 14,
  defaultCenter: { lat: 21.026880, lng: 105.815063 },
  USER_STATUS: {
    deactivated: 'deactivated'
  },
  SEARCH_BOUNDS: {
    sw: {
      lat: 20.973827,
      lng: 105.758016
    },
    ne: {
      lat: 21.089898,
      lng: 105.882231
    }
  }
}
