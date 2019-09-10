import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { faBicycle, faHome, faMapMarkerAlt, faUsersCog } from '@fortawesome/free-solid-svg-icons'
import Component from '@app/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { stylesLocal } from './styles'

const adminDashboardPage = (props) => {
  const { stationsInfo, tripsInfo, usersInfo } = props
  // Check if the user is logged as an admin
  // TODO hook
  return (
    <div id='adminDashboard'>
      {/* ---------------------------------------- Top Navbar ---------------------------------------- */}
      <Row noGutters className='rowNav'>
        <Component.Navbar title={'Admin Dashboard'} />
      </Row>

      <Row noGutters className='rowContainer'>
        <div className='container-fluid'>
          <Row>
            {/* ------------------------------------ Side Navbar ------------------------------------ */}
            <Col className='bg-light border-right' lg={2} md={2} sm={2} xl={2} xs={2} xxl={2}>

              <div className='sidebar-sticky'>
                <ul className='sidebar flex-column'>
                  {/* ---------------------- Dashboard ---------------------- */}
                  <li className='nav-item'>
                    <Link href='/admin/dashboard'>
                      <a className='nav-link active'>
                        <FontAwesomeIcon className='nav-icon' icon={faHome} />
                        {'Dashboard'}
                      </a>
                    </Link>
                  </li>
                  {/* ---------------------- Stations ---------------------- */}
                  <li className='nav-item'>
                    <Link prefetch href='/admin/station'>
                      <a className='nav-link'>
                        <FontAwesomeIcon className='nav-icon fa-w-18' icon={faMapMarkerAlt} />
                        {'Stations'}
                      </a>
                    </Link>
                  </li>
                  {/* ---------------------- Users ---------------------- */}
                  <li className='nav-item'>
                    <Link prefetch href='/admin/users'>
                      <a className='nav-link'>
                        <FontAwesomeIcon className='nav-icon' icon={faUsersCog} />
                        {'Users'}
                      </a>
                    </Link>
                  </li>
                  {/* ---------------------- Trips ---------------------- */}
                  <li className='nav-item'>
                    <Link prefetch href='/admin/trip'>
                      <a className='nav-link'>
                        <FontAwesomeIcon className='nav-icon' icon={faBicycle} />
                        {'Trips'}
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={10} md={10} sm={12} xl={10} xs={12} xxl={10}>
              {/* ------------------------------------ Cards ------------------------------------ */}
              <div className='pt-2 pb-2 mb-2 card-col'>
                {/* ---------------------- Stations infos ---------------------- */}
                <Card>
                  <Card.Header>
                    <Card.Title>
                      <Link prefetch href='/admin/station'>
                        <a className='nav-link'>
                          <FontAwesomeIcon className='nav-icon fa-w-18' icon={faMapMarkerAlt} />
                          {'Stations'}
                        </a>
                      </Link>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {stationsInfo
                      ? (
                        <div>
                          <Card.Text>{'Number of stations : ' + stationsInfo.count}</Card.Text>
                          <Card.Title>{'Status'}</Card.Title>
                          <Card.Text><span>{'Available '}</span><span> {':'} </span><span>{stationsInfo.available}</span></Card.Text>
                          <Card.Text><span>{'Not available '}</span><span> {':'} </span><span>{(stationsInfo.count - stationsInfo.available) }</span></Card.Text>
                        </div>)
                      : <Spinner animation='border' className='mt-4' />
                    }
                  </Card.Body>
                </Card>
                {/* ---------------------- User infos ---------------------- */}
                <Card>
                  <Card.Header>
                    <Card.Title>
                      <Link prefetch href='/admin/users'>
                        <a className='nav-link'>
                          <FontAwesomeIcon className='nav-icon' icon={faUsersCog} />
                          {'Users'}
                        </a>
                      </Link>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    { usersInfo
                      ? <Card.Text>{'Number of users : ' + usersInfo.count }</Card.Text>
                      : <Spinner animation='border' className='mt-4' />
                    }
                  </Card.Body>
                </Card>
                {/* ---------------------- Trips infos ---------------------- */}
                <Card className='card'>
                  <Card.Header>
                    <Card.Title>
                      <Link prefetch href='/admin/trip'>
                        <a className='nav-link'>
                          <FontAwesomeIcon className='nav-icon' icon={faBicycle} />
                          {'Trips'}
                        </a>
                      </Link>
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {tripsInfo
                      ? <Card.Text>{'Number of trips : ' + tripsInfo.count }</Card.Text>
                      : <Spinner animation='border' className='mt-4' />
                    }
                  </Card.Body>
                </Card>
              </div>

            </Col>
          </Row>
        </div>
      </Row>
      <Component.Footer />
      {/* ------------- Styles  ------------- */}
      <style jsx>{stylesLocal}</style>
    </div>
  )
}

export default adminDashboardPage
