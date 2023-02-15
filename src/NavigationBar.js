import { Navbar, Nav } from 'react-bootstrap';
import "./components/css/site.css";

const NavigationBar = () => {
    return ( 
        <>
            <Navbar className="nav-background" expand="lg" bg="dark" variant='dark'>
                <Navbar.Brand> Contact</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
     );
}
 
export default NavigationBar;