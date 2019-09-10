/* eslint-disable no-undef */
import { compose, withProps } from 'recompose'
import { GoogleMap, withGoogleMap } from 'react-google-maps'
import { APP_CONFIG } from '@app/constants'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'

export const MapView = ({ onMapClick, marker, point }) => {
  return (
    <GoogleMap
      defaultCenter={point || APP_CONFIG.defaultCenter}
      defaultZoom={APP_CONFIG.zoom}
      onClick={onMapClick}
    >
      {(marker || point) &&
      <MarkerWithLabel
        labelAnchor={new google.maps.Point(0, 0)}
        position={marker || point}
      ><div />
      </MarkerWithLabel>}
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
