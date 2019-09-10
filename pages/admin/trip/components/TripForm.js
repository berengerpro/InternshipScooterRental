/* eslint-disable react/jsx-no-bind */
import { Alert, Button, Card, Col, Form } from 'react-bootstrap'
import { Field, FieldArray } from 'formik'
import { cardform } from '../styles'
import Link from 'next/link'
import ModalMapSelect from './ModalMapSelect'
import styles from './styles'
import UserSearchBar from './UserSearchBar'

const TripForm = (props) => {
  const { errors, handleChange, handleSubmit, isAdd, isEdit, isSubmitting, touched, values, users, onSetFieldValue } = props
  return (
    <Col className='formcol' lg={8} md={9} sm={10} xl={7} xs={11}>
      <Card className='card-form'>
        <Card.Header>
          <h3>{(isEdit && 'Edit trip') || (isAdd && 'Add new trip')}</h3>
        </Card.Header>
        <Card.Body>
          {/* ------------- Form ------------- */}
          <Form noValidate onSubmit={handleSubmit}>
            {/* ------------- Date Field ------------- */}
            <Form.Group>
              <Form.Label>{'Date'}</Form.Label>
              <Form.Control isInvalid={touched.date && errors.date} name='date' type='date' value={values.date} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.date}</Form.Control.Feedback>
            </Form.Group>

            {/* ------------- Distance Field ------------- */}
            <Form.Group>
              <Form.Label>{'Distance (km)'}</Form.Label>
              <Form.Control isInvalid={touched.distance && errors.distance} name='distance' type='number' value={values.distance} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.distance}</Form.Control.Feedback>
            </Form.Group>

            {/* ------------- Duration Field ------------- */}
            <Form.Group>
              <Form.Label>{'Duration (min)'}</Form.Label>
              <Form.Control isInvalid={touched.duration && errors.duration} name='duration' type='number' value={values.duration} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.duration}</Form.Control.Feedback>
            </Form.Group>

            {/* ------------- From Field ------------- */}
            <Form.Group>
              <Form.Label>{'From'}</Form.Label>
              <Form.Control isInvalid={touched.from && errors.from} name='from' type='text' value={values.from} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.from}</Form.Control.Feedback>
            </Form.Group>

            {/* ------------- To Field ------------- */}
            <Form.Group>
              <Form.Label>{'To'}</Form.Label>
              <Form.Control isInvalid={touched.to && errors.to} name='to' type='text' value={values.to} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.to}</Form.Control.Feedback>
            </Form.Group>

            {/* ------------- Error Uid Field ------------- */}
            {errors.uid && <Alert variant='danger'>{errors.uid}</Alert>}

            {/* ------------- Uid Field ------------- */}
            <Form.Group>
              <Form.Label>{'Uid'}</Form.Label>
              <UserSearchBar formValue={values.userId} name='userId' users={users} onSetFieldValue={onSetFieldValue} />
              <Form.Control.Feedback type='invalid'>{errors.userId}</Form.Control.Feedback>
            </Form.Group>

            {/* ------------- Trip Points Array ------------- */}
            <Form.Group>
              <Form.Label>{'Add a Trip Point (ex: 101,1 ; 101,1)'}</Form.Label>
              <FieldArray
                name='tripPoints'
                render={arrayHelpers => (
                  <div>
                    {values.tripPoints && values.tripPoints.length > 0 ? (
                      values.tripPoints.map((tripPoint, index) => (
                        <div key={index}>
                          {
                            index === 0
                              ? <Form.Label>{'From : '}</Form.Label>
                              : ''
                          }
                          {
                            index === values.tripPoints.length - 1 && index >= 1
                              ? <Form.Label>{'To : '}</Form.Label>
                              : ''
                          }
                          <Form.Row>
                            <Col md={4} xs={6}>
                              <Form.Label>{'Latitude : \xA0'}</Form.Label>
                              <Field name={`tripPoints.${index}.lat`} type='number' value={values.tripPoints[index].lat} />
                            </Col>
                            <Col md={4} xs={6}>
                              <Form.Label>{'Longitude : \xA0'}</Form.Label>
                              <Field name={`tripPoints.${index}.lng`} type='number' value={values.tripPoints[index].lng} />
                            </Col>

                            <Col md={1} xs={4}>
                              <Button
                                className='btn btn-primary btn-xs'
                                type='button'
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                {'-'}
                              </Button>
                            </Col>
                            <Col md={1} xs={4}>
                              <Button
                                className='btn btn-primary btn-xs'
                                type='button'
                                onClick={() => arrayHelpers.push({ lat: '', lng: '' })}
                              >
                                {'+'}
                              </Button>
                            </Col>
                            <Col className='colbuttmap' md={2} xs={4}>
                              <ModalMapSelect index={index} point={values.tripPoints[index]} tripPoints={values.tripPoints} onSetFieldValue={onSetFieldValue} />
                            </Col>
                          </Form.Row>
                        </div>
                      ))
                    ) : (
                      <Button type='button' onClick={() => arrayHelpers.push({ lat: '', lng: '' })}>
                        {'Add'}
                      </Button>
                    )}
                  </div>
                )}
              />
            </Form.Group>

            <Button className='btn-block' disabled={isSubmitting} type='submit'>{(isEdit && 'Update Trip') || (isAdd && 'Add Trip')}</Button>
          </Form>
          <br />

          {/* ------------- Links ------------- */}
          <div className='link-login'>
            <Link prefetch href='/admin/trip'>
              <a>{'- Back to Trips table -'}</a>
            </Link>
          </div>
        </Card.Body>
      </Card>

      {/* ------------- Style ------------- */}
      <style global jsx>{cardform}</style>
      <style global jsx>{styles}</style>
    </Col>
  )
}

export default TripForm
