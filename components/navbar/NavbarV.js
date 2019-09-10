import { Col, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { faBicycle, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const NavbarV = (props) => {
  const { handleLogout, user, onNavigateAbout, onNavigateDashboard, onNavigateHowItWorks, onNavigateMyPage, onNavigateStationsMap, isLoggedIn, title } = props
  return (
    <Col xs={12}>
      <Navbar collapseOnSelect className='nav' expand='lg' variant='primary'>
        <Navbar.Brand className='navbicycle'><Link prefetch href={user && user.isAdmin ? '/admin/dashboard' : '/stationsMap'}><a><FontAwesomeIcon className='icon' icon={faBicycle} /></a></Link></Navbar.Brand>
        <Navbar.Text className='navtext'>{title}</Navbar.Text>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' className='navbar-dark' />
        <Navbar.Collapse className='justify-content-end'>
          {!isLoggedIn || (isLoggedIn && !user.isAdmin)
            ? (
              <Nav>
                <Nav.Link className='navtext' onClick={onNavigateStationsMap}>{'Stations Map'}</Nav.Link>
                <Navbar.Text className='navtext'>{'|'}</Navbar.Text>
                <Nav.Link className='navtext' onClick={onNavigateHowItWorks}>{'How It Works'}</Nav.Link>
                <Navbar.Text className='navtext'>{'|'}</Navbar.Text>
                <Nav.Link className='navtext' onClick={onNavigateAbout}>{'About'}</Nav.Link>
              </Nav>
            )
            : (
              isLoggedIn && <Nav.Link className='navtext dashnav' onClick={onNavigateDashboard}>{'Dashboard'}</Nav.Link>
            )
          }
          {/*
          <NavDropdown alignRight className='flag-icon flag-icon-en'>
            <NavDropdown.Item><span className="flag-icon flag-icon-en"></span></NavDropdown.Item>
            <NavDropdown.Item><span className="flag-icon flag-icon-vn"></span></NavDropdown.Item>
            <NavDropdown.Item><span className="flag-icon flag-icon-fr"></span></NavDropdown.Item>
          </NavDropdown>
          */}
          {!isLoggedIn
            ? (
              <Nav className='rightnav'>
                <Link prefetch href='/signin'>
                  <a className='navlink'>{'Sign In'}</a>
                </Link>
              </Nav>
            )
            : (
              <Nav className='rightnav'>
                {user.isAdmin
                  ? <div className='usertext'>{'Connected as Admin'}</div>
                  : <div className='usertext'>{user.name}</div>}
                <NavDropdown alignRight title={<FontAwesomeIcon className='icon' icon={faUser} />}>
                  {user && user.isAdmin && <NavDropdown.Item onClick={onNavigateDashboard}>{'Admin Dashboard'}</NavDropdown.Item>}
                  {user && !user.isAdmin && <NavDropdown.Item onClick={onNavigateMyPage}>{'My Page'}</NavDropdown.Item>}
                  <NavDropdown.Item onClick={handleLogout}>{'Log Out'}</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
        </Navbar.Collapse>
      </Navbar>
    </Col>
  )
}

export default NavbarV
