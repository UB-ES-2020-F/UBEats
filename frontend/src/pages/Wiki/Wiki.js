import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Accordion, Card, Button, Row } from 'react-bootstrap';


function Wiki() {
  return (
    <section className='wiki'>
        <Container>
            <Row>
                <h1><strong>About UBEats</strong></h1>
            </Row>
    
            <Row>
            <Tabs defaultActiveKey="ourWebsite" id="wikitab" className='custom-tab-bg'>
                <Tab eventKey="ourWebsite" title="Our Website">
                    <Accordion defaultActiveKey="0">
                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>What is our Website</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <b>UBEats es la nueva plataforma de pedidos de referencia, te lo juro!
                                    Yo jamas te mentiria. Nuestros repartidores apenas escupen en la comida,
                                    y les azotamos con latigos de la mas alta calidad! Mira como corren, mira!
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                            <b>Ubereats vs UBEats</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <b> Ubereats who?
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                            <b>How did we approach the UBEats style</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <b> We copied it from Ubereats. There is no honor among thieves.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>
                        
                    </Accordion>
                </Tab>
                <Tab eventKey="customerFeaturesTab" title="Customer Features">
                    <Accordion defaultActiveKey="0">
                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>Navbar</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <b> Bien bonita, de color verde etc.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                            <b>Searchbar</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <b> Pues eso.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                            <b>Login and register primarly as Customer but also as restaurant and deliveryman</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                            <Card.Body>
                                <b> Increible.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                            <b>Homepage with restaurant's information divided by categories</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <b> Increible.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="3">
                            <b>Homepage with restaurant's information divided by categories</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="3">
                            <Card.Body>
                                <b> Increible.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="4">
                            <b>Categories for restaurant (icon filtering)</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                            <Card.Body>
                                <b> Increible.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="5">
                            <b>Restaurant homepage (products and categories)</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="5">
                            <Card.Body>
                                <b> Increible.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="6">
                            <b>Categories for products in a restaurant ( Mainly 4 categories each one with its corresponding products)</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="6">
                            <Card.Body>
                                <b> Increible.
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>

                        
                    </Accordion>
                </Tab>
                <Tab eventKey="developerFeatures" title="Developer Features">
                    <Accordion defaultActiveKey="developerFeaturesAcc">
                    <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>Insertar contenido aqui</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <b> texto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto texto
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>
                    </Accordion>
                        
                </Tab>
                <Tab eventKey="technologiesUsed" title="Technologies Used">
                <Accordion defaultActiveKey="technologiesUsedAcc">
                    <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>Insertar contenido aqui</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <b> texto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto texto
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>
                    </Accordion>
                </Tab>
                <Tab eventKey="chainOfWork" title="Chain of Work">
                <Accordion defaultActiveKey="chainOfWorkAcc">
                    <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>Insertar contenido aqui</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <b> texto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto texto
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>
                    </Accordion>
                </Tab>
                <Tab eventKey="leitmotiv" title="Leitmotiv of Retrospectives">
                <Accordion defaultActiveKey="leitmotivAcc">
                    <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>Insertar contenido aqui</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <b> texto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto texto
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>
                    </Accordion>
                </Tab>
                <Tab eventKey="members" title="Meet the Team">
                <Accordion defaultActiveKey="membersAcc">
                    <Row>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                            <b>Insertar contenido aqui</b>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <b> texto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto textotexto texto
                                texto textotexto textotexto textotexto textotexto texto
                                </b>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Row>
                    </Accordion>
                </Tab>
            </Tabs>
                
            </Row>

            

        </Container>

        
        

        </section>
    );

}

export default Wiki;
