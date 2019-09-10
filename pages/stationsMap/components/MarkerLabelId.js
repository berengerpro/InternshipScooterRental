import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'

export default (props) => {
  const onMarkerClick = (event) => {
    props.handleMarker(props.id)
  }

  return (
    <MarkerWithLabel
    // eslint-disable-next-line react/jsx-no-bind
      onClick={onMarkerClick}
      {...props}
    />
  )
}
