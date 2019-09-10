import { AddEditForm } from '../components'
import Component from '@app/components'
import React from 'react'
import { Row } from 'react-bootstrap'

export default (props) => {
  return (
    <div>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'Station editing'} />
        {/* -----------stations form----------------- */}
        <AddEditForm errors={props.errors} handleChange={props.handleChange} handleSubmit={props.handleSubmit} isSubmitting={props.isSubmitting} status={props.status} submitText={'Apply Changes'} successText={'Station edited.'} title={'Edit station'} touched={props.touched} values={props.values} onSetFieldValue={props.setFieldValue} />
      </Row>
      <Component.Footer />
    </div>
  )
}
