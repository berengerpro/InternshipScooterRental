
import { Col, Row } from 'react-bootstrap'
import { faClock, faRoad } from '@fortawesome/free-solid-svg-icons'
import Component from '@app/components'
import { CustomMap } from './components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React from 'react'
import { stylesLocal } from './styles'

const currentTripPage = (props) => {
  const { tripInfo } = props

  return (
    <div className='globdiv' id='CurrentTrip'>
      {/* ---------------------------------------- Navbar ---------------------------------------- */}
      <Row noGutters className='h-100'>
        <Component.Navbar title={'Current Trip'} />

        {/* ------------------------------------ Trip card ------------------------------------ */}
        <Col lg={4} md={5} sm={12} xl={3} xs={12} xxl={2}>
          {/* When tripInfo is loaded, show the card with the informations */}
          {tripInfo &&
          <div className='card border rounded shadow bg-white rounded'>
            <Row>

              {/* ------------------------- Date ------------------------- */}
              <Col className='text-center' xs={4}>
                {/* --------------- Day --------------- */}
                <p className='text-primary day-text'>{tripInfo && tripInfo.date && moment.unix(tripInfo.date.seconds).format('ddd').toUpperCase()}</p>
                {/* --------------- Day number --------------- */}
                <span className='i-circle'>{tripInfo && tripInfo.date && moment.unix(tripInfo.date.seconds).format('DD').toUpperCase()}</span>
                {/* --------------- Month + Year --------------- */}
                <p className='text-primary day-text pt-2'>{tripInfo && tripInfo.date && moment.unix(tripInfo.date.seconds).format('MMM YYYY').toUpperCase()}</p>
              </Col>

              {/* ----------------------------- Infos ----------------------------- */}
              <Col>
                <Row className='font-weight-bold' xs={8}>
                  {/* --------------- From : --------------- */}
                  { tripInfo && 'From : ' + tripInfo.from}
                  {/* --------------- To : --------------- */}
                  <br />{ tripInfo && 'To : ' + tripInfo.to}
                </Row>
                <Row>
                  <Col>
                    <br /><br /><br /><br />
                    <Row className='text-secondary'>
                      {/* --------------- Road Icon: --------------- */}
                      <FontAwesomeIcon className='mr-1 mt-1' icon={faRoad} />{'Distance'}
                    </Row>
                    <Row className='font-weight-bold'>
                      {/* --------------- Distance : --------------- */}
                      { tripInfo && tripInfo.distance + ' km'}
                    </Row>
                  </Col>
                  <Col>
                    <br /><br /><br /><br />
                    <Row className='text-secondary'>
                      {/* --------------- Clock Icon : --------------- */}
                      <FontAwesomeIcon className='mr-1 mt-1' icon={faClock} />{'Duration'}
                    </Row>
                    <Row className='font-weight-bold'>
                      {/* --------------- Duration : --------------- */}
                      { tripInfo && tripInfo.duration + ' m'}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          }
        </Col>

        {/* ---------------------- Map ---------------------- */}
        <Col className='map' lg={8} md={7} sm={12} xl={9} xs={12} xxl={10}>
          <CustomMap {...props} />
        </Col>
      </Row>
      <Component.Footer />
      {/* ----------- Styles ----------- */}
      <style jsx>{stylesLocal}</style>

    </div>
  )
}

export default currentTripPage
