import { compose } from 'recompose'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import View from './PassFormV'
import { withFormik } from 'formik'
import * as Yup from 'yup'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  return { user: userState.user, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  updatePasswordRequest: (update, resolveCb) => dispatch(UserRedux.Creators.updatePasswordRequest(update, resolveCb))
})

const form = withFormik({
  mapPropsToValues: ({ user }) => ({
    email: user ? user.email : '',
    oldPassword: '',
    password: '',
    passwordConfirm: ''
  }),

  handleSubmit: (values, { props, setErrors, setStatus, setSubmitting }) => {
    const { updatePasswordRequest } = props
    setStatus(null)
    updatePasswordRequest(values, (err) => {
      if (err) {
        setErrors({ sagaPassword: err })
      } else {
        setStatus({ successPassword: true })
      }
      setSubmitting(false)
    })
  },

  validationSchema: () => {
    return Yup.object().shape({
      oldPassword: Yup.string().required('Current password is required').min(6, 'Password must contain at least 6 characters'),
      password: Yup.string().required('New password is required').min(6, 'Password must contain at least 6 characters'),
      passwordConfirm: Yup.string().required('Password confirmation is required').oneOf([Yup.ref('password'), null], 'Passwords don\'t match')
    })
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  form
)(View)
