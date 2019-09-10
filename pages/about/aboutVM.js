import { compose as recompose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import View from './aboutV'

export default recompose(
  connect(
    (state) => ({})
  ),
  withHandlers({
    doSomething: () => () => {
    }
  })
)(View)
