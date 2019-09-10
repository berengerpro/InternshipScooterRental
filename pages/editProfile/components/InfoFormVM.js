import { compose } from 'recompose'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import View from './InfoFormV'
import { withFormik } from 'formik'
import * as Yup from 'yup'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  return { user: userState.user, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  updateInfoRequest: (update, resolveCb) => dispatch(UserRedux.Creators.updateInfoRequest(update, resolveCb))
})

const form = withFormik({
  mapPropsToValues: ({ user }) => ({
    email: user ? user.email : '',
    username: user ? user.name : ''
  }),

  handleSubmit: (values, { props, setErrors, setStatus, setSubmitting }) => {
    const { updateInfoRequest } = props
    setStatus(null)
    updateInfoRequest(values, (err) => {
      if (err) {
        setErrors({ saga: err })
      } else {
        setStatus({ success: true })
      }
      setSubmitting(false)
    })
  },

  validationSchema: () => {
    return Yup.object().shape({
      username: Yup.string().required('Username is required').min(2, 'Too Short').max(70, 'Too Long')
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
