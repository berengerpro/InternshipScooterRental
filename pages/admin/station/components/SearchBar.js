/* eslint-disable no-undef */
/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/no-set-state */
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { APP_CONFIG } from '@app/constants'
import { Form } from 'react-bootstrap'
import React from 'react'

class SearchBar extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      name: props.field.name,
      address: this.props.form.values.address,
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false
    }
  }

  handleChange = address => {
    this.props.form.setFieldTouched(`${this.state.name}.value`)
    this.props.form.setFieldTouched(`${this.state.name}.address`)
    this.props.form.setFieldValue(this.state.name, address)
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: ''
    })
  }

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected })
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState(() => {
          this.props.form.setFieldValue(this.state.name, selected)
          this.props.form.setFieldValue('latitude', lat)
          this.props.form.setFieldValue('longitude', lng)
          return { selected }
        })
      })
      .catch(error => {
        this.setState({ isGeocoding: false, error: error })
      })
  }

  handleError = (status, clearSuggestions) => {
    this.setState({ errorMessage: status }, () => {
      clearSuggestions()
    })
  }

  render () {
    const {
      errorMessage
    } = this.state

    const sw = new google.maps.LatLng(APP_CONFIG.SEARCH_BOUNDS.sw.lat, APP_CONFIG.SEARCH_BOUNDS.sw.lng)
    const ne = new google.maps.LatLng(APP_CONFIG.SEARCH_BOUNDS.ne.lat, APP_CONFIG.SEARCH_BOUNDS.ne.lng)

    const searchOptions = {
      bounds: new google.maps.LatLngBounds(sw, ne),
      types: ['address']
    }

    return (
      <div>
        <PlacesAutocomplete
          name={this.props.field.name}
          searchOptions={searchOptions}
          shouldFetchSuggestions={this.props.form.values.address.length > 2}
          value={this.state.address}
          onChange={this.handleChange}
          onError={this.handleError}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div>
                <div>
                  <Form.Control
                    isInvalid={this.props.form.touched.address && this.props.form.errors.address}
                    {...getInputProps({
                      className: 'form-control'
                    })}
                  />
                </div>
                {suggestions.length > 0 && (
                  <div>
                    {suggestions.map(suggestion => {
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion)}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{' '}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div>{this.state.errorMessage}</div>
        )}

      </div>
    )
  }
}

export default SearchBar
