import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { StationRedux, UserRedux } from '@app/redux/reducers'
import { connect } from 'react-redux'
import View from './stationV'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const stationsState = StationRedux.getReducerState(state)
  return { user: userState.user, isLoggedIn, stations: stationsState.stations }
}

const mapDispatchToProps = dispatch => ({
  getStationsRequest: () => dispatch(StationRedux.Creators.getStationsRequest()),
  editStation: () => dispatch(StationRedux.Creators.editStationRequest()),
  deleteStation: (deleteId) => dispatch(StationRedux.Creators.deleteStationRequest(deleteId))
})

const handler = withHandlers({
  handleEdit: ({ router }) => (id) => {
    router.push('/admin/station/edit?station=' + id)
  },
  onNavigateDashboard: ({ router }) => () => {
    router.push('/admin/dashboard')
  }
})

const withRedirectionAndStations = lifecycle({
  componentDidMount () {
    const { isLoggedIn, user, router, getStationsRequest, setLoading } = this.props
    if (!isLoggedIn || !user.isAdmin) {
      router.push('/admin/signin')
    } else {
      getStationsRequest()
      setLoading(false)
    }
  }
})

const showModal = withState('showModal', 'setShowModal', false)

const load = withState('loading', 'setLoading', true)

const deleteId = withState('deleteId', 'setDeleteId', null)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  showModal,
  deleteId,
  load,
  handler,
  withRedirectionAndStations
)(View)
