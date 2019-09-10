
import { InfoForm, PassForm } from './components'
import Button from 'react-bootstrap/Button'
import Component from '@app/components'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Row from 'react-bootstrap/Row'

export default ({ goToMyPage }) => {
  return (
    <div>
      <Row noGutters className='h-100'>
        {/* -----------Navbar----------------- */}
        <Component.Navbar title={'Edit Profile'} />

        {/* ------------- Edit Profile (main body) ------------- */}
        <div className='col-xl-12 pt-3 text-center'>
          <FontAwesomeIcon className='mb-4' icon={faUserCircle} style={{ 'fontSize': '128px' }} />
        </div>
        <div className='col-xl-4 col-lg-5 col-md-6 pl-3 pr-3 ml-auto mr-auto'>
          <InfoForm />
        </div>
        <div className='col-xl-4 col-lg-5 col-md-6 pl-3 pr-3 ml-auto mr-auto'>
          <PassForm />
        </div>
        <Button className='mt-2 mb-4' variant='light text-primary btn-block' onClick={goToMyPage}>{'- Back to My Page -'}</Button>
      </Row>
      <Component.Footer />
    </div>
  )
}
