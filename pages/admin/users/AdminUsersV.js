import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { ModalDelete, UsersTable } from './components'
import { useCallback, useMemo, useRef } from 'react'
import Component from '@app/components'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { table } from './styles'
import * as R from 'ramda'

const AdminUsers = (props) => {
  const { handleAdd, deleteUserRequest, getUsersListRequest, usersList, handleEdit } = props
  const modalEl = useRef(null)
  const usersArray = useMemo(() => R.values(usersList))

  const handleShowModal = useCallback((id) => {
    modalEl.current.showModal(id)
  }, [])

  const handleDelete = useCallback((id) => {
    deleteUserRequest(
      id,
      () => {
        getUsersListRequest()
        modalEl.current._onCloseModal()
      }
    )
  }, [deleteUserRequest, getUsersListRequest])

  return (
    <div>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'User management'} />
        <Col className='userstable' xs={10} >
          <ModalDelete handleDelete={handleDelete} ref={modalEl} />

          <h3>{'Admin Users'}</h3>
          <div className='linkback'>
            <Link prefetch href='/admin/dashboard'>
              <a>{'- Back to the dashboard -'}</a>
            </Link>
          </div>
          {R.isEmpty(usersList)
            ? <Spinner animation='border' />
            : (
              <div>
                <div className='d-flex justify-content-end mb-3'>
                  <Button variant='primary' onClick={handleAdd}>{'Add User '}<FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
                <UsersTable handleEdit={handleEdit} handleShowModal={handleShowModal} usersArray={usersArray} />
              </div>
            )}
          <style global jsx>{table}</style>
        </Col>
      </Row>
      <Component.Footer />
    </div>
  )
}

export default AdminUsers
