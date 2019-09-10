/* eslint-disable react/jsx-no-bind */

import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import React, { useEffect, useMemo } from 'react'
import Component from '@app/components'
import { CustomMap } from './components'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { pageContentStyle } from './styles'
import { values as Rvalues } from 'ramda'

const StationsMap = (props) => {
  const { selected, getStations, geolocation, stations, searchedStations, handleMarker, handleSubmit, handleChange, values } = props

  useEffect(() => {
    getStations()
  }, [])

  const arrayStations = useMemo(() => Rvalues(stations), [ stations ])

  return (
    <div className='globdiv'>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'Stations Map'} />

        {/* ------------Deatil and search---------------- */}
        <Col className='colleft' sm={3} xs={12}>
          <Form noValidate className='searchform' onSubmit={handleSubmit}>
            <Form.Group className='searchtext'>
              <InputGroup>
                <Form.Control name='search' placeholder='Search' type='text' value={values.search} onChange={handleChange} />
                <InputGroup.Append>
                  <Button type='submit' variant='outline-dark'>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
          {!selected
            ? (searchedStations
              ? searchedStations.map((station, index) => (
                <Card key={index}>
                  <Card.Body>
                    <h6 className='pindetail'>{'Station ' + station.name}</h6>
                    <h6 className='pindetail'>{'Address: ' + station.address}</h6>
                    <h6 className='pindetail'>{'Available Scooters: ' + station.number}</h6>
                    <Button className='pindetail' onClick={() => handleMarker(station.id)}>{'Select'}</Button>
                  </Card.Body>
                </Card>
              ))
              : <h6 className='pindetail'>{'Tap on a station pin to view detail'}</h6>)
            : (
              <div>
                <h6 className='pindetail'>{'Station ' + selected.name}</h6>
                <h6 className='pindetail'>{'Address: ' + selected.address}</h6>
                <h6 className='pindetail'>{'Available Scooters: ' + selected.number}</h6>
              </div>
            )}
        </Col>
        <Col className='map' sm={9} xs={12}>
          <CustomMap arrayStations={arrayStations} geolocation={geolocation} handleMarker={handleMarker} selected={selected} stationsObj={stations} />
        </Col>
      </Row>
      <Component.Footer />
      <style global jsx>{pageContentStyle}</style>
    </div>
  )
}

export default StationsMap
