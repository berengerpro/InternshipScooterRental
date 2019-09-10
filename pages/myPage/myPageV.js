import { faClock, faRoad, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useMemo } from 'react'
import { APP_CONFIG } from '@app/constants'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Component from '@app/components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import moment from 'moment'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Pager from '@app/components/pager'
import Row from 'react-bootstrap/Row'
import styles from './styles'
import * as R from 'ramda'

export default ({ isLoggedIn, handleLogout, user, paginationChangeHandler, page, onNavigateEditProfile }) => {
  if (!user) return (<div>{'Redirecting ...'}</div>)
  if (!user.tripList) return (<div>{'Loading ...'}</div>)

  const tripKeys = useMemo(() => R.keys(user.tripList), [ user.tripList ])

  return (
    <div>
      <Row noGutters>
        {/* ------------- Navbar ------------- */}
        <Component.Navbar title={'My Page'} />

        {/* ------------- Sidebar ------------- */}
        <div className='col-lg-3 d-flex align-content-start flex-wrap justify-content-center' id='sidebar'>
          <Navbar collapseOnSelect bg='' expand='lg' variant='light primary'>
            <Navbar.Brand className='d-lg-none d-xl-none'><FontAwesomeIcon icon={faUserCircle} style={{ 'fontSize': '32px' }} />{' Profile'}</Navbar.Brand>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='flex-column'>
                <Nav.Item className='d-sm-none d-md-none d-lg-block d-xl-block text-center'>
                  <FontAwesomeIcon icon={faUserCircle} style={{ 'fontSize': '128px' }} />
                </Nav.Item>
                <Nav.Item className='font-weight-bold'>
                  <p>{user.name}</p>
                </Nav.Item>
                <Nav.Item>
                  <p>{user.email}</p>
                </Nav.Item>
                <Nav.Item>
                  <p>{'Member since ' + user.memberSince}</p>
                </Nav.Item>
                <Nav.Item>
                  <p>{'Total Trips: ' + user.trips}</p>
                </Nav.Item>
                <Nav.Item>
                  <p>{'Total Distance: ' + user.distance + ' km'}</p>
                </Nav.Item>
                <Nav.Item>
                  <p>{'Total Duration: ' + user.duration}</p>
                </Nav.Item>
                <Nav.Item>
                  <Button className='btn btn-primary btn-block' onClick={onNavigateEditProfile}>{'Edit Profile'}</Button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>

        {/* ------------- Recent Trips (main body) ------------- */}
        <div className='col-lg-9'>
          <div className='pl-4 pr-4'>
            <br />
            <div>
              <h2 className='mb-4'>{'Recent Trips'}</h2>
              <Row>
                {tripKeys.map((key, index) => {
                  if (index > APP_CONFIG.FETCH_COUNT_PER_PAGE - 1) {
                    return null
                  } else {
                    const theDate = moment.unix(user.tripList[key].date.seconds).format('DD')
                    return (
                      <Col key={APP_CONFIG.FETCH_COUNT_PER_PAGE * (page - 1) + index} lg={6} md={6} sm={12} xl={6} xs={12} xxl={4}>
                        <div className='mb-4 pl-4 pr-4 border rounded shadow p-3 mb-5 bg-white rounded'>
                          <Row>
                            <div className='col-sm-3 text-center'>
                              <p className='text-primary day-text'>{moment.unix(user.tripList[key].date.seconds).format('ddd').toUpperCase()}</p>
                              <span className='i-circle'>{theDate}</span>
                              <p className='text-primary day-text pt-2'>{moment.unix(user.tripList[key].date.seconds).format('MMM, YYYY')}</p>
                            </div>
                            <div className='col-sm-9 pt-2 pb-2'>
                              <Row className='font-weight-bold'>
                                {'From : ' + user.tripList[key].from}
                                <br />{'To : ' + user.tripList[key].to}
                                <div className='ml-auto'>
                                  <Link prefetch href={'/tripSummary?trip=' + key}>
                                    <Button className='mt-2 mb-4' variant='light text-primary'>{'Detail'}</Button>
                                  </Link>
                                </div>
                              </Row>
                              <Row>
                                <Col>
                                  <Row className='text-secondary'>
                                    <FontAwesomeIcon className='mr-1' icon={faRoad} />{'Distance'}
                                  </Row>
                                  <Row className='font-weight-bold'>
                                    {user.tripList[key].distance + ' km'}
                                  </Row>
                                </Col>
                                <Col>
                                  <Row className='text-secondary'>
                                    <FontAwesomeIcon className='mr-1' icon={faClock} />{'Duration'}
                                  </Row>
                                  <Row className='font-weight-bold'>
                                    {user.tripList[key].duration + ' m'}
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          </Row>
                        </div>
                      </Col>
                    )
                  }
                })}
                <Col className='text-center align-self-center xl={4} lg={6} md={6} sm={12} xs={12}'>
                  {R.isEmpty(user.tripList) && 'Your trips will appear here'}
                </Col>
              </Row>
              {!R.isEmpty(user.tripList) && <Pager nbPages={Math.ceil(user.trips / APP_CONFIG.FETCH_COUNT_PER_PAGE)} page={page} paginationChange={paginationChangeHandler} />}
            </div>
          </div>
        </div>
      </Row>
      <Component.Footer />
      <style jsx>{styles}</style>
    </div>
  )
}
