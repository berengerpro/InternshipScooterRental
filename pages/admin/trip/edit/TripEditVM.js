import { compose, lifecycle, withHandlers } from 'recompose'
import { TripRedux, UserRedux } from '@app/redux/reducers'
import { connect } from 'react-redux'
import TripEdit from './TripEditV'

import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import * as Yup from 'yup'

const mapStateToProps = (state, { tripQuery }) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  const usersList = userState.usersList
  const usersSearch = R.keys(usersList).reduce((prev, key) => {
    prev.push({ title: key, description: usersList[key].email })
    return prev
  }, [])

  const tripState = TripRedux.getReducerState(state)
  const tripsList = tripState.tripsList

  const editedTrip = !R.isEmpty(tripsList) && { ...tripsList[tripQuery], tripPoints: tripsList[tripQuery].tripPoints }

  return { user, tripsList, editedTrip, isLoggedIn, users: usersSearch }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest()),
  updateTripRequest: (formData, uid, resolveCb) => dispatch(TripRedux.Creators.updateTripRequest(formData, uid, resolveCb))
})

const editForm = withFormik({
  mapPropsToValues: ({ editedTrip }) => {
    let tripPoints
    if (editedTrip) {
      tripPoints = editedTrip.tripPoints.reduce((array, point) => {
        array.push({ lat: point._lat, lng: point._long })
        return array
      }, [])
    }
    return {
      date: editedTrip.formatDate,
      distance: editedTrip.distance,
      duration: editedTrip.duration,
      from: editedTrip.from,
      to: editedTrip.to,
      userId: editedTrip.userId,
      tripPoints
    }
  },

  handleSubmit: (values, { props, setErrors, setSubmitting }) => {
    const { tripQuery, updateTripRequest, router } = props

    updateTripRequest(
      { ...values, date: new Date(values.date) },
      tripQuery,
      ({ error: err }) => {
        if (err) {
          setErrors({ userId: err.message })
        } else {
          router.push('/admin/trip')
        }
        setSubmitting(false)
      }
    )
  },

  validationSchema: () => {
    return Yup.object().shape({
      date: Yup.date(),
      distance: Yup.number(),
      duration: Yup.number(),
      from: Yup.string(),
      to: Yup.string()
    })
  }
})

const handlers = withHandlers({
  onNavigateDashboard: ({ router }) => () => {
    router.push('/admin/dashboard')
  },
  onNavigateMyPage: ({ router }) => () => {
    router.push('/myPage')
  }
})

const withRedirect = lifecycle({
  componentDidMount () {
    const { isLoggedIn, user, router } = this.props
    if (!isLoggedIn || !user.isAdmin) {
      router.push('/admin/signin')
    }
  }
})

const TripEditPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withRedirect,
  editForm,
  handlers
)(TripEdit)

TripEditPage.getInitialProps = async ({ ctx }) => {
  return { tripQuery: ctx.query.trip }
}

export default TripEditPage
