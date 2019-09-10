/* eslint-disable no-undef */
/* eslint-disable react/no-set-state */
import { Button, Modal } from 'react-bootstrap'
import React, { PureComponent } from 'react'
import MapSelectStation from './MapSelectStation'

class ModalMapSelect extends PureComponent {
  state = {
    marker: null,
    showModal: false
  }

  _geoCallback = (obj) => {
    this.props.onSetFieldValue('address', obj[0].formatted_address)
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
    this.props.onSetFieldValue('longitude', this.state.marker.lng)
    this.props.onSetFieldValue('latitude', this.state.marker.lat)
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ location: { lat: this.state.marker.lat, lng: this.state.marker.lng } }, this._geoCallback)
    this._onCloseModal()
  }

  render () {
    return (
      <div>
        <Button onClick={this._onShowModal}>{'Select position on map'}</Button>
        <Modal centered className='modal-mapselect' dialogClassName='modalmap' show={this.state.showModal} size='lg' onHide={this._onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{'Select position'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MapSelectStation marker={this.state.marker} point={this.props.point.lat && this.props.point.lng && this.props.point} onMapClick={this._onMapClick} />
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
