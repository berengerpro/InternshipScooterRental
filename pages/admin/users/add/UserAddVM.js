import { compose, lifecycle, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import UserAdd from './UserAddV'
import { UserRedux } from '@app/redux/reducers'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as Yup from 'yup'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  return { user, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest()),
  addUserRequest: (formData, resolveCb) => dispatch(UserRedux.Creators.addUserRequest(formData, resolveCb))
})

const addForm = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
    name: '',
    trips: 0,
    duration: 0,
    distance: 0
  }),

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    const { addUserRequest, router } = props

    values.memberSince = new Date()
    addUserRequest(
      values,
      (err) => {
        if (err) {
          setErrors({ add: err.message })
        } else {
          router.push('/admin/users')
        }
        setSubmitting(false)
      }
    )
  },

  validationSchema: () => {
    return Yup.object().shape({
      email: Yup.string().email('Enter a valid email address').required('Enter an email address'),
      password: Yup.string().min(6, 'Password needs more than 5 characters').required('Enter a password'),
      name: Yup.string().required('Enter a name'),
      trips: Yup.number().min(0, 'Positive number only').required('Trips required'),
      duration: Yup.number().min(0, 'Positive number only').required('Duration required'),
      distance: Yup.number().min(0, 'Positive number only').required('Distance required')
    })
  }
})

const handlers = withHandlers({
  handleDashboard: ({ router }) => () => {
    router.push('/admin/dashboard')
  },
  handleMyPage: ({ router }) => () => {
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

const UserAddPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withRedirect,
  addForm,
  handlers
)(UserAdd)

export default UserAddPage
