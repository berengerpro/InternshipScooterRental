
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const Signup = ({ isLoggedIn, values, handleSubmit, handleChange, touched, errors, signupSuccess, isSubmitting, status }) => {
  return (
    <div className='container-fluid'>
      <Row className='justify-content-md-center'>
        <Col className='text-center col' md={6} xs={10}>
          <FontAwesomeIcon className='bicycle' icon={faBicycle} />
          <h2>{'Scooter Rental Sign Up'}</h2>
          {status && <Alert variant='success'>{'New user created. You can go to Sign In page'}</Alert>}
          {errors.signup && <Alert variant='danger'>{errors.signup}</Alert>}
          <Card className='card-form'>
            <Card.Body>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>{'Email'}</Form.Label>
                  <Form.Control isInvalid={touched.email && errors.email} name='email' type='text' value={values.email} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>{'Name'}</Form.Label>
                  <Form.Control isInvalid={touched.name && errors.name} name='name' type='text' value={values.name} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>{'Password'}</Form.Label>
                  <Form.Control isInvalid={touched.password && errors.password} name='password' type='password' value={values.password} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>{'Confirm Password'}</Form.Label>
                  <Form.Control isInvalid={touched.passwordConf && errors.passwordConf} name='passwordConf' type='password' value={values.passwordConf} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.passwordConf}</Form.Control.Feedback>
                </Form.Group>
                <Button className='btn-block' disabled={isSubmitting} type='submit'>{'Sign Up'}</Button>
              </Form>
              <br />
              <div className='link-login'>
                <Link prefetch href='/signin'>
                  <a>{'- Back to Sign In -'}</a>
                </Link>
              </div>
              <br />
              <div className='link-login'>
                <Link prefetch href='/stationsMap'>
                  <a>{'- Return to stations map -'}</a>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Signup
