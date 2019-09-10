import { compose, lifecycle, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { UserRedux } from '@app/redux/reducers'
import View from './editProfileV'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  return { user: userState.user, isLoggedIn }
}

const mapDispatchToProps = dispatch => ({

})

const handler = withHandlers({
  goToMyPage: ({ router }) => () => {
    router.push('/myPage')
  }
})

const withRedirection = lifecycle({
  componentDidMount () {
    const { isLoggedIn, router, user } = this.props
    if (!isLoggedIn) {
      router.push('/signin')
    } else if (isLoggedIn && user.isAdmin) {
      router.push('/admin/dashboard')
    }
  }
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  handler,
  withRedirection
)(View)
