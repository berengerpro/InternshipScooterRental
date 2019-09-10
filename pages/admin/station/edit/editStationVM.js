import { compose, lifecycle, withState } from 'recompose'
import { StationRedux, UserRedux } from '@app/redux/reducers'
import { connect } from 'react-redux'
import View from './editStationV'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as Yup from 'yup'

const mapStateToProps = (state, props) => {
  const { router } = props
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const stationsState = StationRedux.getReducerState(state)
  const stations = stationsState.stations
  let station = null // station is the station being edited
  if (stations !== null) {
    station = stations[router.query.station]
  }
  return { user: userState.user, isLoggedIn, stations, station }
}

const mapDispatchToProps = dispatch => ({
  editStationRequest: (stationId, formData, resolveCb) => dispatch(StationRedux.Creators.editStationRequest(stationId, formData, resolveCb))
})

const withRedirection = lifecycle({
  componentDidMount () {
    const { isLoggedIn, user, router } = this.props
    if (!isLoggedIn || !user.isAdmin) {
      router.push('/admin/signin')
    }
  }
})

const form = withFormik({
  mapPropsToValues: (props) => ({
    name: props.station ? props.station.name : '',
    address: props.station ? props.station.address : '',
    latitude: props.station ? props.station.location.latitude : '',
    longitude: props.station ? props.station.location.longitude : '',
    number: props.station ? props.station.number : ''
  }),

  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    setStatus(null)
    const { router } = props
    props.editStationRequest(
      router.query.station,
      values,
      (err) => {
        if (err) {
          setErrors({ edit: err.message })
        } else {
          setStatus({ success: true })
        }
        setSubmitting(false)
      }
    )
  },

  validationSchema: () => {
    return Yup.object().shape({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      latitude: Yup.number().required('Latitude is required'),
      longitude: Yup.number().required('Longitude is required'),
      number: Yup.number().integer('The number of available scooters must be an integer').min(0, 'The number of available scooters must be positive').required('The number of available scooters is required')
    })
  }
}
)

const withStationId = withState('stationId', 'setStationId', '')

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStationId,
  form,
  withRedirection
)(View)
