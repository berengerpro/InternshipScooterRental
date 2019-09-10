import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { TripRedux, UserRedux } from '@app/redux/reducers'

import { connect } from 'react-redux'
import TripManagement from './TripManagementV'

import { withRouter } from 'next/router'

const handlers = withHandlers({
  onNavigateDashboard: ({ router }) => () => {
    router.push('/admin/dashboard')
  },
  onNavigateMyPage: ({ router }) => () => {
    router.push('/myPage')
  },
  onNavigateShowModal: ({ modalRef }) => (id) => {
    modalRef.showModal(id)
  },
  onNavigateEdit: ({ router }) => (id) => {
    router.push('/admin/trip/edit?trip=' + id)
  },
  onNavigateAdd: ({ router }) => () => {
    router.push('/admin/trip/add')
  }

})

const withRedirection = lifecycle({
  componentDidMount () {
    if (!this.props.isLoggedIn || !this.props.user.isAdmin) {
      this.props.router.push('/admin/signin')
    } else {
      this.props.getTripsListRequest()
      this.props.getUsersListRequest()
      this.props.setFetching(false)
    }
  }
})

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  const tripState = TripRedux.getReducerState(state)
  const tripsList = tripState.tripsList
  return { user, tripsList, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest()),
  getTripsListRequest: (resolveCb) => dispatch(TripRedux.Creators.getTripsListRequest(resolveCb)),
  getUsersListRequest: (resolveCb) => dispatch(UserRedux.Creators.getUsersListRequest(resolveCb)),
  deleteTripRequest: (uid, resolveCb) => dispatch(TripRedux.Creators.deleteTripRequest(uid, resolveCb))
})

const fetching = withState('fetching', 'setFetching', true)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  fetching,
  withRedirection,
  handlers
)(TripManagement)
