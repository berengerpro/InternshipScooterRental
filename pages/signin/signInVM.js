import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import View from './signInV'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  return { isLoggedIn, user }
}

const mapDispatchToProps = dispatch => ({
  loginRequest: (email, password, resolveCb) => dispatch(UserRedux.Creators.loginRequest(email, password, resolveCb))
})

const form = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),

  handleSubmit: (values, actions) => {
    const email = values.email
    const password = values.password
    actions.props.loginRequest(email, password, (err) => {
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
    if (isLoggedIn && !user.isAdmin) {
      router.push('/myPage')
    } else if (isLoggedIn && user.isAdmin) {
      router.push('/admin/dashboard')
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  form,
  withRedirect
)(View)
