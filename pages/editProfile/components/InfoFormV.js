
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import React from 'react'

export default ({ handleLogout, user, validated, values, errors, status, touched, handleSubmit, handleSubmitPassword, handleChange }) => {
  return (
    <div>
      {/* -------------------------- Error Field -------------------------- */}
      {status ? status.success && <Alert variant='success'>{'Profile edited.'}</Alert> : null}
      {errors.saga && <Alert variant='danger'>{errors.saga.message}</Alert>}
      <div className='pl-4 pr-4 mb-4 border rounded' style={{ background: '#FFFFFF' }}>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className='text-center h4 pt-4'>{'Change your name'}</div>
          <Form.Row>
            <Form.Group as={Col} controlId='validationCustom02' md='12'>
              <Form.Label>{'Name'}</Form.Label>
              <Form.Control
                isInvalid={touched.username && !!errors.username}
                isValid={touched.username && !errors.username}
                name='username'
                type='text'
                value={values.username}
                onChange={handleChange}
              />
              <Form.Control.Feedback>{'Looks good!'}</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId='validationCustom01' md='12'>
              <Form.Label>{'Email'}</Form.Label>
              <Form.Control
                disabled
                readOnly
                name='email'
                type='email'
                value={values.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback>{'Looks good!'}</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button className='btn-block mt-4 mb-4' type='submit'>{'Save'}</Button>
        </Form>
      </div>
    </div>
  )
}
