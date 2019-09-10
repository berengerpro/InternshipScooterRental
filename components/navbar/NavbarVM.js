import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import NavbarV from './NavbarV'
import { UserRedux } from '@app/redux/reducers'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  return { user, isLoggedIn }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest())
})

const navigate = withHandlers({
  handleLogout: ({ router, logout }) => () => {
    logout()
  },
  onNavigateDashboard: ({ router }) => () => {
    router.push('/admin/dashboard')
  },
  onNavigateMyPage: ({ router }) => () => {
    router.push('/myPage')
  },
  onNavigateStationsMap: ({ router }) => () => {
    router.push('/stationsMap')
  },
  onNavigateHowItWorks: ({ router }) => () => {
    router.push('/howItWorks')
  },
  onNavigateAbout: ({ router }) => () => {
    router.push('/about')
  }
})

const NavbarComponent = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  navigate
)(NavbarV)

export default NavbarComponent
