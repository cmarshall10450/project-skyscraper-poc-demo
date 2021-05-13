import { Navbar, Nav } from 'react-bootstrap'

const Navigation = () => {
	return (
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="#home" style={{ marginLeft: '20px' }}>
				Merkle ARM UI
			</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link href="/composer">Composer</Nav.Link>
			</Nav>
		</Navbar>
	)
}

export default Navigation
