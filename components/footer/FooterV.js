import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default (props) => {
  const { onNavigateToS, onNavigatePolicy } = props
  return (
    <footer className='foot text-light app-footer'>
      <div className='list-unstyled text-right mt-4 pt-3 pb-3 pr-5'>
        <Row>
          <Col sm={4} xs={0} />
          <Col className='text-center' sm={4} xs={12}>
            <span>{'© 2019 BHSoft.'}</span>
          </Col>
          <Col sm={4} xs={12}>
            <a onClick={onNavigateToS}>{'Terms of service'}</a>
            {' | '}
            <a onClick={onNavigatePolicy}>{'Privacy policy'}</a>
          </Col>
        </Row>
      </div>
    </footer>
  )
}
