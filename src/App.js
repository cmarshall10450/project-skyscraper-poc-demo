import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import ResourcesList from './components/ResourcesList'
import Editor from './components/Editor'
import Inspector from './components/Inspector'
import Navigation from './components/Navigation'

import './App.scss'

function App() {
	return (
		<>
			<Navigation />
			<Container fluid>
				<Row>
					<Col md={2} className="sidebar resources-list">
						<ResourcesList />
					</Col>
					<Col>
						<Editor />
					</Col>
					<Col md={2} className="sidebar inspector">
						<Inspector />
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default App
