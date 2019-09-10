import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { ModalDelete, StationTable } from './components'
import React, { useCallback, useRef } from 'react'
import Component from '@app/components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { table } from './styles'

const signinPage = (props) => {
  const { stations, deleteStation, handleEdit, loading } = props

  const modalEl = useRef(null)
  const handleShowModal = useCallback((id) => {
    modalEl.current.showModal(id)
  }, [])

  const handleDelete = useCallback((id) => {
    deleteStation(id)
    modalEl.current._onCloseModal()
  }, [deleteStation])

  return (
    <div>
      <Row noGutters className='h-100'>

        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'Stations management'} />
        {/* -----------stations table----------------- */}
        <Col className='stationtable' xs={10}>
          <h2>{'Admin Station'}</h2>
          <div className='linkback'>
            <Link prefetch href='/admin/dashboard'>
              <a>{'- Back to the dashboard -'}</a>
            </Link>
          </div>
          {/* -------------------------- Station Table -------------------------- */}
          {!loading ? <div className='d-flex justify-content-end mb-3'><Button href='./station/add' id={0} variant='primary'>{'Add Station '}<FontAwesomeIcon icon={faPlus} /></Button></div> : null }
          {loading
            ? <Spinner animation='border' />
            : (<StationTable handleEdit={handleEdit} handleShowModal={handleShowModal} stations={stations} />)
          }
          <ModalDelete handleDelete={handleDelete} ref={modalEl} />
        </Col>
        <style global jsx>{table}</style>
      </Row>
      <Component.Footer />
    </div>
  )
}

export default signinPage
