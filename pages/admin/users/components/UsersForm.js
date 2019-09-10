import { Alert, Button, Card, Col, Form } from 'react-bootstrap'
import Link from 'next/link'

const UsersForm = (props) => {
  const { handleSubmit, touched, errors, values, handleChange, isSubmitting, isEdit, isAdd } = props

  return (
    <Col className='formcol' lg={8} md={9} sm={10} xl={7} xs={11}>
      {errors.add && <Alert variant='danger'>{errors.add}</Alert>}
      <Card className='card-form'>
        <Card.Header>
          <h3>{(isEdit && 'Edit user') || (isAdd && 'Add new user')}</h3>
        </Card.Header>
        <Card.Body>
          <Form noValidate onSubmit={handleSubmit}>
            {isAdd && (
              <div>
                <Form.Group>
                  <Form.Label>{'Email'}</Form.Label>
                  <Form.Control isInvalid={touched.email && errors.email} name='email' type='email' value={values.email} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Label>{'Password'}</Form.Label>
                  <Form.Control isInvalid={touched.password && errors.password} name='password' type='password' value={values.password} onChange={handleChange} />
                  <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
              </div>)}
            <Form.Group>
              <Form.Label>{'Name'}</Form.Label>
              <Form.Control isInvalid={touched.name && errors.name} name='name' type='text' value={values.name} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
            </Form.Group>
            {isAdd &&
            <Form.Group>
              <Form.Label>{'Trips'}</Form.Label>
              <Form.Control isInvalid={touched.trips && errors.trips} name='trips' type='number' value={values.trips} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.trips}</Form.Control.Feedback>
            </Form.Group>}
            <Form.Group>
              <Form.Label>{'Distance'}</Form.Label>
              <Form.Control isInvalid={touched.distance && errors.distance} name='distance' type='number' value={values.distance} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.distance}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>{'Duration'}</Form.Label>
              <Form.Control isInvalid={touched.duration && errors.duration} name='duration' type='number' value={values.duration} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.duration}</Form.Control.Feedback>
            </Form.Group>
            {isEdit &&
            <Form.Group>
              <Form.Label>{'Member Since'}</Form.Label>
              <Form.Control isInvalid={touched.memberSince && errors.memberSince} name='memberSince' type='date' value={values.memberSince} onChange={handleChange} />
              <Form.Control.Feedback type='invalid'>{errors.memberSince}</Form.Control.Feedback>
            </Form.Group>}
            <Button className='btn-block' disabled={isSubmitting} type='submit'>{(isEdit && 'Update user') || (isAdd && 'Add user')}</Button>
          </Form>
          <br />
          <div className='link-login'>
            <Link prefetch href='/admin/users'>
              <a>{'- Back to Users table -'}</a>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default UsersForm
