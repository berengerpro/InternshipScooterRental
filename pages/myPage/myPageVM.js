import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import View from './myPageV'
import { withRouter } from 'next/router'

const enhance = withState('page', 'setPage', 1)

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  return { user, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  logoutRequest: (resolveCb) => dispatch(UserRedux.Creators.logoutRequest(resolveCb)),
  getInfoRequest: () => dispatch(UserRedux.Creators.getInfoRequest()),
  getTripRequest: (pageNumber) => dispatch(UserRedux.Creators.getTripRequest(pageNumber))
})

const handler = withHandlers({
  paginationChangeHandler: ({ getTripRequest, setPage }) => (pageNumber) => {
    setPage(pageNumber)
    getTripRequest(pageNumber)
  },
  onNavigateEditProfile: ({ router }) => () => {
    router.push('/editProfile')
  }
})

const withUserData = lifecycle({
  componentDidMount () {
    if (!this.props.isLoggedIn) {
      this.props.router.push('/signin')
    } else if (this.props.isLoggedIn && this.props.user.isAdmin) {
      this.props.router.push('/admin/dashboard')
    } else {
      this.props.getInfoRequest()
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  enhance,
  withRouter,
  handler,
  withUserData
)(View)
