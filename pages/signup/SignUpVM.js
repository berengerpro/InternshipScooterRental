
import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import SignUp from './SignUpV'
import { UserRedux } from '@app/redux/reducers'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as Yup from 'yup'

const mapDispatchToProps = dispatch => ({
  signupRequest: (formData, resolveCb) => dispatch(UserRedux.Creators.signupRequest(formData, resolveCb))
})

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  return { isLoggedIn, user }
}

const form = withFormik({
  mapPropsToValues: () => ({
    email: '',
    name: '',
    password: '',
    passwordConf: ''
  }),

  handleSubmit: (values, { props, setSubmitting, setStatus, setErrors }) => {
    setStatus(null)
    props.signupRequest(
      values,
      (err) => {
        if (err) {
          setErrors({ signup: err.message })
        } else {
          setStatus({ success: true })
        }
        setSubmitting(false)
      }
    )
  },

  validationSchema: () => {
    return Yup.object().shape({
      email: Yup.string().email('Need to be a vaild email address').required('Enter an email'),
      name: Yup.string().required('Enter a name'),
      password: Yup.string().min(6, 'Password needs more than 5 characters').required('Enter a password'),
      passwordConf: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Enter your password again')
    })
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

const withSignupModel = compose(
  connect(mapStateToProps, mapDispatchToProps),
  form,
  withRouter,
  withRedirect
)

export default withSignupModel(SignUp)
