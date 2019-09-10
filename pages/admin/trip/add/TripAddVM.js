import { compose, lifecycle, withHandlers } from 'recompose'
import { TripRedux, UserRedux } from '@app/redux/reducers'

import { connect } from 'react-redux'
import TripAdd from './TripAddV'

import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import * as Yup from 'yup'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  const usersList = userState.usersList
  const usersSearch = R.keys(usersList).reduce((prev, key) => {
    prev.push({ title: key, description: usersList[key].email })
    return prev
  }, [])

  return { user, isLoggedIn, users: usersSearch }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest()),
  addTripRequest: (formData, resolveCb) => dispatch(TripRedux.Creators.addTripRequest(formData, resolveCb))
})

const addForm = withFormik({
  mapPropsToValues: () => ({
    date: '',
    distance: 0,
    duration: 0,
    from: '',
    to: '',
    userId: '',
    tripPoints: []
  }),

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const { addTripRequest, router } = props

    addTripRequest(
      { ...values, date: new Date(values.date) },
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
      date: Yup.date().required('Enter a date'),
      from: Yup.string().required('Enter a start point'),
      to: Yup.string().required('Enter a destination'),
      userId: Yup.string().required('Enter a uid')
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

const TripAddPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withRedirect,
  addForm,
  handlers
)(TripAdd)

export default TripAddPage
