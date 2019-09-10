import { Accordion, Card, Col, Row } from 'react-bootstrap'
import Component from '@app/components'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styles from './styles'

const howItWorksPage = () => {
  return (
    <div>
      <Row noGutters className='h-100'>
        {/* ----------- Navbar ----------------- */}
        <Component.Navbar title={'How it works'} />

        {/* ---------------------- Body ---------------------- */}
        <Col>
          <h2 className='text-center m-4'>{'How it works'}</h2>
          <div className='link'>
            <Link href='/'>
              <a >{'Return to Home page'}</a>
            </Link>
          </div>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' Registration instruction'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  {'Click on this '}
                  <Link href='/signup'>
                    <a>{'link '}</a>
                  </Link>
                  {'to register, and you\'ll be able to fullfil a registration form'}
                  <br />
                  {'The age limit to register is : +18'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='1'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' I\'m registered, and now?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>

            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='2'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' How can I start riding a scooter'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='2'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='3'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' How long can I rent the scooter'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='3'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='4'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' Where can I ride the scooter'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='4'>
                <Card.Body>
                  {'Mainly in areas where there are scooter stations'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='5'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' How do I return my scooter to the station'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='5'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='6'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' Can I lock the scooter in an other location than a scooter station'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='6'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='7'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' Can I return the scooter to a full station'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='7'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='8'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' What should I do when I notice that the scooter I\'ve chosen is broken?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='8'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='9'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' Who should I contact in case of problems?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='9'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='10'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' What happens if I use the scooter longer than allowed hours'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='10'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='11'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' What if I don\'t return the scooter?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='11'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='12'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' What if the scooter is stolen?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='12'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='13'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' What should I do in case of accident with the scooter?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='13'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='14'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' Rules on "helmet is a must"'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='14'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='15'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {' Can I purchase access to multiple scooter?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='15'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>

        </Col>
      </Row>
      <Component.Footer />
      <style global jsx>{styles}</style>
    </div>
  )
}

export default howItWorksPage
