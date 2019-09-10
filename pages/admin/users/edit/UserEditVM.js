import { compose, lifecycle, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import UserEdit from './UserEditV'
import { UserRedux } from '@app/redux/reducers'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'
import * as R from 'ramda'
import * as Yup from 'yup'

const mapStateToProps = (state, { userQuery }) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  const usersList = userState.usersList

  const editedUser = !R.isEmpty(usersList) && usersList[userQuery]
  return { user, usersList, editedUser, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest()),
  updateUserRequest: (formData, uid, resolveCb) => dispatch(UserRedux.Creators.updateUserRequest(formData, uid, resolveCb))
})

const editForm = withFormik({
  mapPropsToValues: ({ editedUser }) => ({
    name: editedUser.name,
    duration: editedUser.duration,
    distance: editedUser.distance,
    memberSince: editedUser.formatDate
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    const { userQuery, updateUserRequest, router } = props

    updateUserRequest(
      { ...values, memberSince: new Date(values.memberSince) },
      userQuery,
      () => {
        setSubmitting(false)
        router.push('/admin/users')
      }
    )
  },

  validationSchema: () => {
    return Yup.object().shape({
      name: Yup.string().required('Name required'),
      distance: Yup.number().required('Distance required'),
      duration: Yup.number().required('Duration required'),
      memberSince: Yup.date().required('MemberSince required')
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

const UserEditPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withRedirect,
  editForm,
  handlers
)(UserEdit)

UserEditPage.getInitialProps = async ({ ctx }) => {
  return { userQuery: ctx.query.user }
}

export default UserEditPage
