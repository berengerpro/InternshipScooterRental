import { compose, lifecycle } from 'recompose'
import { StationRedux, UserRedux } from '@app/redux/reducers'
import { connect } from 'react-redux'
import View from './addStationV'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as Yup from 'yup'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const stationsState = StationRedux.getReducerState(state)
  return { user: userState.user, isLoggedIn, stations: stationsState.stations }
}

const mapDispatchToProps = dispatch => ({
  addStationRequest: (formData, resolveCb) => dispatch(StationRedux.Creators.addStationRequest(formData, resolveCb))
})

const withRedirectionAndStations = lifecycle({
  componentDidMount () {
    const { isLoggedIn, user, router } = this.props
    if (!isLoggedIn || !user.isAdmin) {
      router.push('/admin/signin')
    }
  }
})

const form = withFormik({
  mapPropsToValues: () => ({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    number: 0
  }),

  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    setStatus(null)
    props.addStationRequest(
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
      longitude: Yup.number().required('longitude is required'),
      number: Yup.number().integer('The number of available scooters must be an integer').min(0, 'The number of available scooters must be positive').required('The number of available scooters is required')
    })
  }
}
)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  form,
  withRouter,
  withRedirectionAndStations
)(View)
