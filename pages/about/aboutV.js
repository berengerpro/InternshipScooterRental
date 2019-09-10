import { Accordion, Card, Col, Row } from 'react-bootstrap'
import Component from '@app/components'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import styles from './styles'

const aboutPage = () => {
  return (
    <div>
      <Row noGutters className='h-100'>
        {/* ----------- Navbar ----------------- */}
        <Component.Navbar title={'About'} />

        {/* ---------------------- Body ---------------------- */}
        <Col>
          <h2 className='text-center m-4'>{'About'}</h2>
          <div className='link'>
            <Link href='/'>
              <a >{'Return to Home page'}</a>
            </Link>
          </div>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {'What is a rented scooter?'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='1'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {'The rental scooter system'}
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
                {'How many scooters are there'}
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
                {'How many scooter stations are there'}
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
                {' What happens if a scooter station is full or empty'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='4'>
                <Card.Body>
                  {'Lorem ipsum'}
                </Card.Body>
              </Accordion.Collapse>
            </Card>

            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='5'>
                <FontAwesomeIcon className='' icon={faChevronRight} />
                {'Who pays for the scooter system'}
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
                {'Who manufactures rental scooters?'}
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
                {'What does a rental scooter look like?'}
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
                {'Some fun facts on the site'}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='8'>
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

export default aboutPage
