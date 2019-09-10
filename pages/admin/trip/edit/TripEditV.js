import Component from '@app/components'
import React from 'react'
import { Row } from 'react-bootstrap'
import { TripForm } from '../components'

const TripEdit = (props) => {
  const { editedTrip, errors, handleChange, handleSubmit, isSubmitting, touched, values, users, setFieldValue } = props

  return (
    <div>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'Trips editing'} />

        {/* ----------------- Edit Form ----------------- */}
        <TripForm isEdit editedTrip={editedTrip} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} users={users} values={values} onSetFieldValue={setFieldValue} />
      </Row>
      <Component.Footer />
    </div>
  )
}

export default TripEdit
