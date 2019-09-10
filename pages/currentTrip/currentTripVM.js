import { compose, lifecycle } from 'recompose'
import { TripRedux, UserRedux } from '@app/redux/reducers'
import { connect } from 'react-redux'
import View from './currentTripV'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user

  const { tripInfo } = TripRedux.getReducerState(state)
  return { isLoggedIn, tripInfo, user }
}

const mapDispatchToProps = dispatch => ({
  tripRequest: () => dispatch(TripRedux.Creators.tripRequest())
})

const withRedirect = lifecycle({
  componentDidMount () {
    if (!this.props.isLoggedIn) {
      this.props.router.push('/signin')
    } else if (this.props.isLoggedIn && this.props.user.isAdmin) {
      this.props.router.push('/admin/dashboard')
    } else {
      this.props.tripRequest()
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withRedirect
)(View)
