/* eslint-disable no-undef */
import { compose, withProps } from 'recompose'
import { GoogleMap, withGoogleMap } from 'react-google-maps'
import { APP_CONFIG } from '@app/constants'
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import MarkerLabelId from './MarkerLabelId'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import * as R from 'ramda'

export const MapView = ({ arrayStations, stationsObj, selected, geolocation, handleMarker }) => {
  return (
    <GoogleMap
      center={!selected ? (geolocation || (!R.isEmpty(arrayStations) ? { lat: arrayStations[0].location._lat, lng: arrayStations[0].location._long } : APP_CONFIG.defaultCenter)) : { lat: selected.location.latitude, lng: selected.location.longitude }}
      defaultCenter={APP_CONFIG.defaultCenter}
      defaultZoom={APP_CONFIG.zoom}
    >
      {geolocation &&
      <MarkerWithLabel
        icon='/static/icons/markers/geolocationPoint.png'
        labelAnchor={new google.maps.Point(0, 0)}
        position={geolocation}
        zIndex={2}
      ><div />
      </MarkerWithLabel>
      }
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={50}
      >
        {stationsObj && Object.keys(stationsObj).map((key, index) => (
          <MarkerLabelId
            clickable
            handleMarker={handleMarker}
            icon={selected && selected.id === key
              ? '/static/icons/markers/selected.png'
              : (stationsObj[key].number > 3
                ? '/static/icons/markers/moreThanThree.png'
                : (stationsObj[key].number > 0
                  ? '/static/icons/markers/lessThanFour.png'
                  : '/static/icons/markers/noAvailable.png')
              )
            }
            id={key}
            // eslint-disable-next-line no-undef
            key={index}
            labelAnchor={Math.floor(stationsObj[key].number / 10) === 0 ? new google.maps.Point(7, 45) : new google.maps.Point(13, 45)}
            labelStyle={{ fontWeight: 'bold', fontSize: '20px' }}
            position={{ lat: stationsObj[key].location._lat, lng: stationsObj[key].location._long }}
            zIndex={1}
          >
            <div id={index}>{stationsObj[key].number > 0 ? stationsObj[key].number : 'X'}</div>
          </MarkerLabelId>
        ))}
      </MarkerClusterer>
    </GoogleMap>
  )
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
