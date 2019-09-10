import Component from '@app/components'
import React from 'react'
import { Row } from 'react-bootstrap'
import { UsersForm } from '../components'

const UserEdit = (props) => {
  const { editedUser, touched, errors, values, handleChange, handleSubmit, isSubmitting } = props
  return (
    <div>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'User editing'} />
        {/* --------------Form-------------- */}
        <UsersForm isEdit editedUser={editedUser} errors={errors} handleChange={handleChange} handleSubmit={handleSubmit} isSubmitting={isSubmitting} touched={touched} values={values} />
      </Row>
      <Component.Footer />
    </div>
  )
}

export default UserEdit
