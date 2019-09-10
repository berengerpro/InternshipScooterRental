import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { faBicycle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

const signinPage = ({ errors, handleChange, handleSubmit, isLoggedIn, isSubmitting, touched, router, user }) => {
  return (
    <div className='container-fluid' id='Log In'>
      <Row className='justify-content-md-center'>
        <Col className='text-center col'md={6} xs={10}>
          <FontAwesomeIcon className='bicycle' icon={faBicycle} />
          <h2>{'Admin Sign In'}</h2>

          {/* -------------------------- Error Field -------------------------- */}
          {errors.login && <Alert variant='danger'>{errors.login.message}</Alert>}

          <Card className='card-form'>
            <Card.Body>

              {/* --------------------------------- Form --------------------------------- */}
              <Form noValidate onSubmit={handleSubmit}>

                {/* ------------------------------ Email Input --------------------------- */}
                <Form.Row>
                  <Form.Group as={Col} className='pt-4' controlId='validationEmail' md='12'>
                    <Form.Label>{'Email'}</Form.Label>
                    <Form.Control
                      required
                      isInvalid={touched.email && !!errors.email}
                      isValid={touched.email && !errors.email}
                      name='email'
                      type='text'
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>{'Looks good!'}</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                {/* ----------------------- Password Input ---------------------- */}
                <Form.Row>
                  <Form.Group as={Col} controlId='validationPassword' md='12'>
                    <Form.Label>{'Password'}</Form.Label>
                    <Form.Control
                      required
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

                    {/* ------ Forgot Password ------
                    <div className='text-right'>
                      <Link href=''>
                        <a>{'Forgot password?'}</a>
                      </Link>
                    </div> */}
                  </Form.Group>
                </Form.Row>
                <br />

                {/* ------------------------- Submit-------------------------  */}
                <Button className='btn-block' disabled={isSubmitting} type='submit'>{'Sign In as an Admin'}</Button>
              </Form>
              <br />

              {/* ------- Regular Sign In ------- */}
              <div className='link-login'>
                <Link href='/signin'>
                  <a>{'- Regular Sign In -'}</a>
                </Link>
              </div>
              <br />
              <div className='link-login'>
                <Link href='/stationsMap'>
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

export default signinPage
