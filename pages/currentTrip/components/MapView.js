import { compose, withProps } from 'recompose'
import { GoogleMap, Polyline, withGoogleMap } from 'react-google-maps'
import { APP_CONFIG } from '@app/constants'

// Render of the map
const MapView = (props) => {
  if (props.tripInfo) {
    return (
      <div>
        {/* ---------------- Map ---------------- */}
        <GoogleMap
          defaultCenter={props.tripInfo.tripPoints && props.tripInfo && props.tripInfo.tripPoints.length !== 0 ? props.tripInfo.tripPoints[0] : APP_CONFIG.defaultCenter}
          defaultZoom={APP_CONFIG.zoom}
        >
          {/* ---------------- Draw itinerary ---------------- */}
          {props.tripInfo.tripPoints &&
          <Polyline
            geodesic
            options={{
              strokeColor: '#FF0000', // red Color
              strokeOpacity: 0.75,
              strokeWeight: 2
            }}
            // Get the lat and the long from tripPoints to have a path to show
            path={props.tripInfo && props.tripInfo.tripPoints}

          />}
        </GoogleMap>
      </div>
    )
  } else {
    // Return Loading while tripInfo isn't loaded yet
    return (
      <div> {'Loading'} </div>
    )
  }
}

const googleMapProps = withProps({
  googleMapURL: APP_CONFIG.MAPS_URL,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `100%`, width: `100%` }} />,
  mapElement: <div style={{ height: `100%` }} />
})

const CustomMap = compose(
  googleMapProps,
  withGoogleMap
)(MapView)

export default CustomMap
