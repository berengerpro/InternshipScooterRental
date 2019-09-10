import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import TripSummary from './TripSummaryV'
import UserRedux from '@app/redux/User/UserRedux'
import { withRouter } from 'next/router'

const mapStateToProps = (state, { tripQuery }) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  let tripInfo = null
  if (user) {
    tripInfo = user.tripList[tripQuery]
  }
  if (tripInfo) {
    tripInfo.tripPoints = tripInfo.tripPoints.map((point) => {
      return { lat: point._lat, lng: point._long }
    })
  }
  return { tripInfo, isLoggedIn, user }
}

const withRedirect = lifecycle({
  componentDidMount () {
    if (!this.props.isLoggedIn) {
      this.props.router.push('/signin')
    } else if (!this.props.tripQuery || !this.props.tripInfo) {
      this.props.router.push('/myPage')
    } else if (this.props.isLoggedIn && this.props.user.isAdmin) {
      this.props.router.push('/admin/dashboard')
    }
  }
})

const TripSummaryPage = compose(
  connect(mapStateToProps),
  withRouter,
  withRedirect
)(TripSummary)

TripSummaryPage.getInitialProps = async ({ ctx }) => {
  return { tripQuery: ctx.query.trip }
}

export default TripSummaryPage
