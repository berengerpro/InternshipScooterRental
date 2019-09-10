/* eslint-disable react/no-set-state */
import { Button, Modal } from 'react-bootstrap'
import React, { PureComponent } from 'react'
import MapSelectTripPoints from './MapSelectTripPoints'

class ModalMapSelect extends PureComponent {
  state = {
    marker: null,
    showModal: false
  }

  _onShowModal = () => {
    this.setState({
      showModal: true
    })
  }

  _onCloseModal = () => {
    this.setState({
      marker: null,
      showModal: false
    })
  }

  _onMapClick = ({ latLng }) => {
    this.setState({
      showModal: true,
      marker: { lat: latLng.lat(), lng: latLng.lng() }
    })
  }

  _onSelect = () => {
    this.props.onSetFieldValue(`tripPoints.${this.props.index}.lng`, this.state.marker.lng)
    this.props.onSetFieldValue(`tripPoints.${this.props.index}.lat`, this.state.marker.lat)
    this._onCloseModal()
  }

  render () {
    return (
      <div>
        <Button className='btn btn-primary btn-xs' onClick={this._onShowModal}>{'Map'}</Button>
        <Modal centered className='modal-mapselect' dialogClassName='modalmap' show={this.state.showModal} size='lg' onHide={this._onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{'Select position'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MapSelectTripPoints
              marker={this.state.marker}
              point={this.props.point.lat && this.props.point.lng && this.props.point}
              tripPath={this.props.index > 0 && this.props.tripPoints.slice(0, this.props.index)}
              onMapClick={this._onMapClick}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={this._onCloseModal}>{'Cancel'}</Button>
            <Button disabled={!this.state.marker} variant='primary' onClick={this._onSelect}>{'Select'}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default ModalMapSelect
