import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import View from './signInV'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  return { user: userState.user, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  adminLoginRequest: (email, password, resolveCb) => dispatch(UserRedux.Creators.adminLoginRequest(email, password, resolveCb))
})

const handler = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),

  handleSubmit: (values, actions) => {
    const email = values.email
    const password = values.password
    actions.props.adminLoginRequest(email, password, (err) => {
      if (err) {
        actions.setErrors({ login: err })
      }
      actions.setSubmitting(false)
    })
  },

  validate: (values) => {
    const errors = {}
    if (!values.email) errors.email = 'Enter an email'
    if (!values.password) errors.password = 'Enter a password'
    if (values.password.length < 6) errors.password = 'The password must be at least 6 characters long'
    return errors
  }
}

)

const withRedirect = lifecycle({
  componentDidMount () {
    const { isLoggedIn, router, user } = this.props
    if (isLoggedIn && user.isAdmin) {
      router.push('/admin/dashboard')
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  handler,
  withRouter,
  withRedirect
)(View)
