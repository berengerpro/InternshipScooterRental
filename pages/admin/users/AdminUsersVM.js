import { compose, lifecycle, withHandlers, withState } from 'recompose'
import AdminUsers from './AdminUsersV'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import { withRouter } from 'next/router'

const handlers = withHandlers({
  handleShowModal: ({ modalRef }) => (id) => {
    modalRef.showModal(id)
  },
  handleEdit: ({ router }) => (id) => {
    router.push('/admin/users/edit?user=' + id)
  },
  handleAdd: ({ router }) => () => {
    router.push('/admin/users/add')
  }
})

const withRedirection = lifecycle({
  componentDidMount () {
    if (!this.props.isLoggedIn || !this.props.user.isAdmin) {
      this.props.router.push('/admin/signin')
    } else {
      this.props.getUsersListRequest()
      this.props.setFetching(false)
    }
  }
})

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  const usersList = userState.usersList
  return { user, usersList, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  getUsersListRequest: (resolveCb) => dispatch(UserRedux.Creators.getUsersListRequest(resolveCb)),
  deleteUserRequest: (uid, resolveCb) => dispatch(UserRedux.Creators.deleteUserRequest(uid, resolveCb))
})

const fetching = withState('fetching', 'setFetching', true)

const AdminUsersPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  fetching,
  withRedirection,
  handlers
)(AdminUsers)

export default AdminUsersPage
