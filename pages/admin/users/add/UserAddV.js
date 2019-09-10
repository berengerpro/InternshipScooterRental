import Component from '@app/components'
import React from 'react'
import { Row } from 'react-bootstrap'
import { UsersForm } from '../components'

const UserAdd = (props) => {
  const { touched, errors, values, handleChange, handleSubmit, isSubmitting } = props
  return (
    <div>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'User adding'} />
        {/* --------------Form-------------- */}
        <UsersForm isAdd errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} values={values} />
      </Row>
      <Component.Footer />
    </div>
  )
}

export default UserAdd
