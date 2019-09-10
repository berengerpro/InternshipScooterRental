import { Alert, Button, Card, Col, Form } from 'react-bootstrap'
import { Field } from 'formik'
import Link from 'next/link'
import ModalMapSelect from './ModalMapSelect'
import SearchBar from './SearchBar'
import styles from './styles'

export default (props) => {
  const { values, handleSubmit, handleChange, touched, errors, isSubmitting, status, submitText, successText, title, onSetFieldValue } = props
  return (
    <Col className='formcol' lg={8} md={9} sm={10} xl={7} xs={11}>
      {/* -------------------------- Form -------------------------- */}
      {status && <Alert variant='success'>{successText}</Alert>}
      {errors.edit && <Alert variant='danger'>{errors.edit}</Alert>}
      <Card className='card-form'>
        <Card.Header>
          <h3>{title}</h3>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>{'Name'}</Form.Label>
              <Form.Control isInvalid={touched.name && errors.name} name='name' type='text' value={values.name} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{'Address'}</Form.Label>
              <Field component={SearchBar} name='address' />
              <Form.Control.Feedback type='invalid'>{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>{'Latitude'}</Form.Label>
                  <Form.Control isInvalid={touched.latitude && errors.latitude} name='latitude' step='0.1' type='number' value={values.latitude} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.latitude}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group>
                  <Form.Label>{'Longitude'}</Form.Label>
                  <Form.Control isInvalid={touched.longitude && errors.longitude} name='longitude' step='0.1' type='number' value={values.longitude} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.longitude}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className='colbuttmap' xs={12}>
                <ModalMapSelect point={{ lat: values.latitude, lng: values.longitude }} onSetFieldValue={onSetFieldValue} />
              </Col>
            </Form.Row>
            <Form.Group>
              <Form.Label>{'Number of available scooters'}</Form.Label>
              <Form.Control isInvalid={touched.number && errors.number} name='number' type='text' value={values.number} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.number}</Form.Control.Feedback>
            </Form.Group>
            <Button className='btn-block' disabled={isSubmitting} type='submit'>{submitText}</Button>
          </Form>
          <br />
          <div className='link-login'>
            <Link prefetch href='../station'>
              <a>{'- Back to Stations List -'}</a>
            </Link>
          </div>
        </Card.Body>
      </Card>
      <style global jsx>{styles}</style>
    </Col>
  )
}
