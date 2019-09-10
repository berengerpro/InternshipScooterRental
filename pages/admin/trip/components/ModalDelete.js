/* eslint-disable react/no-set-state */
import { Button, Modal } from 'react-bootstrap'
import React, { PureComponent } from 'react'

class ModalDelete extends PureComponent {
  state = {
    deleteId: null,
    showModal: false
  }

  showModal = (id) => {
    this.setState({
      deleteId: id,
      showModal: true
    })
  }

  _onCloseModal = () => {
    this.setState({
      deleteId: null,
      showModal: false
    })
  }

  _onDelete = () => {
    this.props.handleDelete(this.state.deleteId)
  }

  render () {
    const { showModal } = this.state
    return (
      <Modal show={showModal} onHide={this._onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{'Delete Trip'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{'Do you really want to delete this trip ?'}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={this._onCloseModal}>{'No'}</Button>
          <Button variant='primary' onClick={this._onDelete}>{'Yes'}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalDelete
