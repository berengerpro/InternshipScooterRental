import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import View from './forgotPasswordV'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as Yup from 'yup'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  return { isLoggedIn, user }
}

const mapDispatchToProps = dispatch => ({
  resetPassword: (email, resolveCb) => dispatch(UserRedux.Creators.resetPassword(email, resolveCb))
})

const withRedirect = lifecycle({
  componentDidMount () {
    if (this.props.isLoggedIn && !this.props.user.isAdmin) {
      this.props.router.push('/myPage')
    } else if (this.props.isLoggedIn && this.props.user.isAdmin) {
      this.props.router.push('/admin/dashboard')
    }
  }
})

const handler = withFormik({
  mapPropsToValues: () => ({
    email: ''
  }),

  handleSubmit: (values, actions) => {
    const email = values.email
    actions.props.resetPassword(email, () => {
      actions.setStatus({ success: true })
      actions.setSubmitting(false)
    })
  },

  validationSchema: () => {
    return Yup.object().shape({
      email: Yup.string().email('Need to be a vaild email address').required('Enter an email')
    })
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
