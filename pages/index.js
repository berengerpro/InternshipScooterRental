import { Button, Card, Col, Row } from 'react-bootstrap'
import { compose, lifecycle, withHandlers } from 'recompose'
import { faInfoCircle, faMapMarked, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Component from '@app/components'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { indexStyle } from './indexStyles'
import Link from 'next/link'
import UserRedux from '@app/redux/User/UserRedux'
import { withRouter } from 'next/router'

const Index = ({ appState, onNavigateAbout, onNavigateHowItWorks, onNavigateStationsMap }) => {
  return (
    <div>
      <Row noGutters className='justify-content-md-center'>
        <Component.Navbar title={'Homepage'} />
        <Col className='text-center' md={10} xs={12}>
          <h2>{'Scooter Rental App'}</h2>
          <Card>
            <Card.Header>
              <Link href='/stationsMap'>
                <a><FontAwesomeIcon icon={faMapMarked} />{' Stations Map'}</a>
              </Link>
            </Card.Header>
            <Card.Body>
              <p>{'This page provides a map with all stations in Hanoï, a description of each station and a search bar to search for stations.'}</p>
              <Button onClick={onNavigateStationsMap}>{'Go to the page'}</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Link href='/howItWorks'>
                <a><FontAwesomeIcon icon={faInfoCircle} />{' How it works'}</a>
              </Link>
            </Card.Header>
            <Card.Body>
              <p>{'This page will be useful if you want to understand how to rent scooters on stations.'}</p>
              <Button onClick={onNavigateHowItWorks}>{'Go to the page'}</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>
              <Link href='/about'>
                <a><FontAwesomeIcon icon={faQuestionCircle} />{' About'}</a>
              </Link>
            </Card.Header>
            <Card.Body>
              <p>{'This page will be good if you want to know more about ourselves and what we are doing.'}</p>
              <Button onClick={onNavigateAbout}>{'Go to the page'}</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Component.Footer />
      <style global jsx>{indexStyle}</style>
    </div>
  )
}

export default compose(
  connect((state) => {
    const userState = UserRedux.getReducerState(state)
    const isLoggedIn = UserRedux.isLoggedIn(userState)
    const user = userState.user
    return { isLoggedIn, user }
  }),
  withRouter,
  withHandlers({
    onNavigateStationsMap: ({ router }) => () => {
      router.push('/stationsMap')
    },
    onNavigateHowItWorks: ({ router }) => () => {
      router.push('/howItWorks')
    },
    onNavigateAbout: ({ router }) => () => {
      router.push('/about')
    }
  }),
  lifecycle({
    componentDidMount () {
      if (this.props.isLoggedIn && this.props.user.isAdmin) {
        this.props.router.push('/admin/dashboard')
      }
    }
  })
)(Index)
