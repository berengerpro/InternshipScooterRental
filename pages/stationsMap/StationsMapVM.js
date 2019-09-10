import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { GeoLocationRedux, StationRedux, UserRedux } from '@app/redux/reducers'
import { connect } from 'react-redux'
import StationsMap from './StationsMapV'
import { withFormik } from 'formik'
import { withRouter } from 'next/router'

const mapStateToProps = (state) => {
  const userState = UserRedux.getReducerState(state)
  const stationState = StationRedux.getReducerState(state)
  const geoLocationState = GeoLocationRedux.getReducerState(state)

  const isLoggedIn = UserRedux.isLoggedIn(userState)
  const user = userState.user
  const stations = stationState.stations
  const geolocation = geoLocationState.geolocation
  return { isLoggedIn, user, stations, geolocation }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(UserRedux.Creators.logoutRequest()),
  getInfoRequest: () => dispatch(UserRedux.Creators.getInfoRequest()),
  getStations: () => dispatch(StationRedux.Creators.getStationsRequest())
})

const selected = withState('selected', 'setSelected', null)

const searchedStations = withState('searchedStations', 'setSearchedStations', null)

const handlers = withHandlers({
  handleMarker: (props) => (id) => {
    props.setSelected(props.stations[id])
  },
  handleMyPage: ({ router }) => () => {
    router.push('/myPage')
  }
})

const searchForm = withFormik({
  mapPropsToValues: () => ({
    search: ''
  }),

  handleSubmit: ({ search }, { props }) => {
    props.setSelected(null)
    props.setSearchedStations(Object.keys(props.stations).reduce((searched, key, id) => {
      if (props.stations[key].name.toLowerCase().includes(search.toLowerCase())) {
        searched.push({ ...props.stations[key], id: key })
      }
      return searched
    }, []))
  }
})

const withUserData = lifecycle({
  componentDidMount () {
    if (this.props.isLoggedIn && !this.props.user.isAdmin) {
      this.props.getInfoRequest()
    } else if (this.props.isLoggedIn && this.props.user.isAdmin) {
      this.props.router.push('/admin/dashboard')
    }
  }
})

const ComposedStationsMap = compose(
  connect(mapStateToProps, mapDispatchToProps),
  searchedStations,
  withRouter,
  withUserData,
  selected,
  searchForm,
  handlers
)(StationsMap)

export default ComposedStationsMap
