import { compose, withHandlers } from 'recompose'
import FooterV from './FooterV'
import { withRouter } from 'next/router'

const navigate = withHandlers({
  onNavigateToS: ({ router }) => () => {
    router.push('/ToS')
  },
  onNavigatePolicy: ({ router }) => () => {
    router.push('/policy')
  }
})

export default compose(
  withRouter,
  navigate
)(FooterV)
