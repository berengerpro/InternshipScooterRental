import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { ModalDelete, TripsTable } from './components'
import { useCallback, useMemo, useRef } from 'react'

import Component from '@app/components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { table } from './styles'

import * as R from 'ramda'

const TripManagement = (props) => {
  const { deleteTripRequest, fetching, getTripsListRequest, onNavigateAdd, onNavigateEdit, tripsList } = props
  const modalEl = useRef(null)
  const tripsArray = useMemo(
    () => R.values(tripsList),
    [tripsList])

  const onNavigateShowModal = useCallback((id) => {
    modalEl.current.showModal(id)
  }, [])

  const handleDelete = useCallback((id) => {
    deleteTripRequest(
      id,
      () => {
        getTripsListRequest()
        modalEl.current._onCloseModal()
      }
    )
  }, [deleteTripRequest, getTripsListRequest])

  return (
    <div>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'Trips management'} />

        {/* --------------------- Table --------------------- */}
        <Col className='tripstable' xs={10}>
          <ModalDelete handleDelete={handleDelete} ref={modalEl} />
          <h3>{'Trips'}</h3>
          <div className='linkback'>
            <Link prefetch href='/admin/dashboard'>
              <a>{'- Back to the dashboard -'}</a>
            </Link>
          </div>
          <div className='d-flex justify-content-end mb-3'>
            <Button variant='primary' onClick={onNavigateAdd}>
              {'Add Trip '}
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
          {fetching
            ? <Spinner animation='border' />
            : (<TripsTable tripsArray={tripsArray} onNavigateEdit={onNavigateEdit} onNavigateShowModal={onNavigateShowModal} />)}

          {/* ------------- Style ------------- */}
          <style global jsx>{table}</style>
        </Col>
      </Row>
      <Component.Footer />
    </div>
  )
}

export default TripManagement
