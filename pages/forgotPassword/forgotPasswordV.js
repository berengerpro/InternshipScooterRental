import { Alert, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styles from './styles'

const forgotPasswordPage = ({ errors, handleChange, handleSubmit, isLoggedIn, isSubmitting, touched, router, status }) => {
  /* ------------- Redirection ------------- */
  if (isLoggedIn) {
    router.push('/myPage')
  }

  return (
    <div className='globdiv' id='Log In'>
      <Row noGutters className='justify-content-md-center h-100'>
        <Col className='text-center col' md='auto'>

          {/* -------------------------- Status -------------------------- */}
          {status && <Alert variant='success'>{'If your email exists, an email has been sent on it to reset your password'}</Alert>}

          <Card className='card-form'>
            <Card.Body>

              <FontAwesomeIcon className='bicycle' icon={faLock} />
              <h2>{'Forgot Password ?'}</h2>
              <p>{'You can reset you password here'}</p>

              {/* --------------------------------- Form --------------------------------- */}
              <Form noValidate onSubmit={handleSubmit}>

                {/* ------------------------------ Email Input --------------------------- */}
                <Form.Row>
                  <Form.Group as={Col} className='pt-4' controlId='validationEmail' md='12'>
                    <InputGroup className='mb-3'>
                      <InputGroup.Prepend>
                        <InputGroup.Text ><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        isInvalid={touched.email && !!errors.email}
                        isValid={touched.email && !errors.email}
                        name='email'
                        placeholder='Email address'
                        type='email'
                        onChange={handleChange}
                      />
                    </InputGroup>

                    <Form.Control.Feedback>{'Looks good!'}</Form.Control.Feedback>
                    <Form.Control.Feedback type='invalid'>
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                {/* ------------------------- Submit-------------------------  */}
                <Button className='btn-block' disabled={isSubmitting} type='submit'>{'Reset Password'}</Button>
              </Form>
              <br />

              {/* ------- Sign In ------- */}
              <div className='link-login'>
                <Link href='/signin'>
                  <a>{'- Come back to Sign In -'}</a>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ------- Style ------- */}
      <style global jsx>{styles}</style>
    </div>
  )
}

export default forgotPasswordPage
