/* eslint-disable no-undef */
import { compose, withProps } from 'recompose'
import { GoogleMap, Polyline, withGoogleMap } from 'react-google-maps'
import { APP_CONFIG } from '@app/constants'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'

export const MapView = ({ onMapClick, marker, point, tripPath }) => {
  return (
    <GoogleMap
      defaultCenter={point || (tripPath.length > 0 ? tripPath[tripPath.length - 1] : APP_CONFIG.defaultCenter)}
      defaultZoom={APP_CONFIG.zoom}
      onClick={onMapClick}
    >
      {(marker || point) &&
      <MarkerWithLabel
        labelAnchor={new google.maps.Point(0, 0)}
        position={marker || point}
      ><div />
      </MarkerWithLabel>}
      {tripPath && tripPath.map((p, ind) => {
        return (
          <MarkerWithLabel
            icon='/static/icons/markers/selected.png'
            key={ind}
            labelAnchor={new google.maps.Point(7, 45)}
            labelStyle={{ fontWeight: 'bold', fontSize: '20px' }}
            position={p}
          ><div>{ind + 1}</div>
          </MarkerWithLabel>)
      })
      }
      {tripPath.length > 1 &&
        <Polyline
          geodesic
          options={{
            strokeColor: '#FF0000', // red Color
            strokeOpacity: 0.75,
            strokeWeight: 2
          }}
          path={tripPath}
        />}
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
