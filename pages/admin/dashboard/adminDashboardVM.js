import { compose, lifecycle } from 'recompose'
import { StationRedux, TripRedux, UserRedux } from '@app/redux/reducers'
import { connect } from 'react-redux'

import View from './adminDashboardV'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)

  const stationsState = StationRedux.getReducerState(state)
  const tripState = TripRedux.getReducerState(state)

  const stationsInfo = stationsState.stationsInfo

  const usersInfo = userState.userInfo

  const tripsInfo = tripState.tripInfo

  const user = userState.user

  return { isLoggedIn, stationsInfo, tripsInfo, usersInfo, user }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest()),
  tripInfo: () => dispatch(TripRedux.Creators.tripInfo()),
  getStationsInfo: () => dispatch(StationRedux.Creators.getStationsInfo()),
  userInfo: () => dispatch(UserRedux.Creators.userInfo())
})

const withUserData = lifecycle({
  componentDidMount () {
    const { isLoggedIn, router, tripInfo, getStationsInfo, userInfo, user } = this.props
    if (!isLoggedIn || !user.isAdmin) {
      router.push('/admin/signin')
    } else {
      tripInfo()
      getStationsInfo()
      userInfo()
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withUserData
)(View)
