/* eslint-disable react/jsx-handler-names */
/* eslint-disable react/no-set-state */
/* eslint-disable react/jsx-no-bind */
import { Form, ListGroup } from 'react-bootstrap'
import React from 'react'
import * as R from 'ramda'

class UserSearchBar extends React.PureComponent {
  constructor (props) {
    super()
    this.state = {
      filter: [],
      clicked: true
    }
  }

  handleChange = (e) => {
    this.props.onSetFieldValue('userId', e.currentTarget.value)
    if (this.props.users) {
      const filter = this.props.users.filter(el => el.description.includes(e.currentTarget.value) || el.title.includes(e.currentTarget.value))
      this.setState({
        filter,
        clicked: false
      })
    }
  }

  handleSearchClick = (e) => {
    this.props.onSetFieldValue('userId', e.currentTarget.value)
    this.setState({ filter: [], clicked: true })
  }

  render () {
    return (
      <div>
        <Form.Control
          placeholder='Search users with email or uid'
          type='text'
          value={this.props.formValue}
          onChange={this.handleChange}
        />
        {this.props.formValue &&
        <ListGroup>
          {!R.isEmpty(this.state.filter)
            ? this.state.filter.map((obj, index) => {
              return (
                <ListGroup.Item action key={index} value={obj.title} onClick={this.handleSearchClick}>
                  {obj.description}
                </ListGroup.Item>
              )
            })
            : (!this.state.clicked && <div>{'No results found'}</div>)
          }
        </ListGroup>
        }
      </div>
    )
  }
}

export default UserSearchBar
