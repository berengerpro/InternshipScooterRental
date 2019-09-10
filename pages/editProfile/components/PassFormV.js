
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import React from 'react'

export default ({ handleLogout, validated, values, errors, status, touched, handleSubmit, handleChange }) => {
  return (
    <div>
      {/* -------------------------- Error Field -------------------------- */}
      {status ? status.successPassword && <Alert variant='success'>{'Password updated.'}</Alert> : null}
      {errors.sagaPassword && <Alert variant='danger'>{errors.sagaPassword.message}</Alert>}
      <div className='pl-4 pr-4 border rounded' style={{ background: '#FFFFFF' }}>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className='text-center h4 pt-4'>{'Change your password'}</div>
          <Form.Row>
            <Form.Control
              hidden
              readOnly
              name='email'
              type='email'
              value={values.email}
              onChange={handleChange}
            />
            <Form.Group as={Col} controlId='validationCustom05' md='12'>
              <Form.Label>{'Current Password'}</Form.Label>
              <Form.Control
                isInvalid={touched.oldPassword && !!errors.oldPassword}
                isValid={touched.oldPassword && !errors.oldPassword}
                name='oldPassword'
                type='password'
                onChange={handleChange}
              />
              <Form.Control.Feedback>{'Looks good!'}</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.oldPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId='validationCustom03' md='12'>
              <Form.Label>{'New Password'}</Form.Label>
              <Form.Control
                isInvalid={touched.password && !!errors.password}
                isValid={touched.password && !errors.password}
                name='password'
                type='password'
                onChange={handleChange}
              />
              <Form.Control.Feedback>{'Looks good!'}</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId='validationCustom04' md='12'>
              <Form.Label>{'New Password Confirmation'}</Form.Label>
              <Form.Control
                isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                isValid={touched.passwordConfirm && !errors.passwordConfirm}
                name='passwordConfirm'
                type='password'
                onChange={handleChange}
              />
              <Form.Control.Feedback>{'Looks good!'}</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.passwordConfirm}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Button className='btn-block mt-4 mb-4' type='submit'>{'Save'}</Button>
        </Form>
      </div>
    </div>
  )
}
