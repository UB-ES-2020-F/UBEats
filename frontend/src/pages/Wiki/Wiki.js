import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Accordion, Card, Button, Row, Col, Nav, TabContainer} from 'react-bootstrap';


function Wiki() {
  return (
    <section className='wiki'>
        <Container>
            <Row>
                <h1><strong>About UBEats</strong></h1>
            </Row>
    

            <Tab.Container id="left-tabs-example" defaultActiveKey="ourWebsite">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="ourWebsite">Our Website</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey="customerFeaturesTab"> Customer Features</Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link eventKey="developerFeatures">Developer Features</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey="technologiesUsed" >Technologies Used</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey="chainOfWork" >Chain of Work</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey="leitmotiv">Leitmotiv of Retrospectives</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey="members">Meet the Team</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="ourWebsite">
                        <Accordion defaultActiveKey="0">
                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                    <b>What is our Website</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <b> 
                                            Have you ever been sitting on your sofa and thinking 'Oh man I'd really like some pizza' but didn't want to go to a restaurant or prepared all by yourself? 
                                            That's why we have developed UbEats, a website where you can order from your favourities restaurants in the comfort of your home!
                                            It is as simple as going to our website https://ub-gei-es-ubeats-clone.herokuapp.com/, log in if you already have an account and start ordering with only one click!
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
                                        <b> 
                                            UbEats is a webstie clone of Ubereats, the purpose of the creation of such website is purely educational on how to recreate a website from scratch. Therefore the license applied to UbEats project is MIT and 
                                            all credits to  @2020 Uber Technologies Inc. on https://ubereats.com. The main differences find between these two are due to lack of time or money ( pe : hosting, domain) but the whole UbEats tries to be as similar to Ubereats 
                                            as possible. 
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
                        </Tab.Pane>
                        <Tab.Pane eventKey="customerFeaturesTab">
                        <Card>
                        <Accordion defaultActiveKey="3">
                                <Accordion.Toggle as={Card.Header} eventKey="3">
                                    <b>Ubereats vs UBEats</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                            <b> 
                                                As a customer, a registered user, we have several features to be talked about and are worth mentioning.
                                                First of all, as a visitor you can choose to surf around the website with almost no restriction at all. But at any moment you can sign in (if you already have an accout) or register.
                                                In terms of registration there are 3 possibilities, one for customers (main purpose), one for restaurants and one for users who wants to work as deliveryman. Even though there are 3 registration pages, 
                                                the login is shared through all of them but the website has only the customer view (first one).

                                                On entering onto the website for the first time we can see a similar style to Ubereats, in fact most of the style is based on ubereats official website. The page shown as entering is called Homepage, 
                                                here we can explore the affilliated restaurants easily, seeing for each restaurant  its name ( per example 'McDonald') and a representative image of it. What's more, each restaurant is categorized into one of the 13 possible categories,
                                                allowing viewers to reduce the search time and aim towards its wishes. In fact, each icon filters restaurants and shows only the restaurants belonging to that specific category. It is worth mentioning that the homepage shows 
                                                a variety of top restaurants and every restaurant at the same time the user continues to scroll down.
                                                A user can click on whichever restaurant he/she wants ( either the image or the title) and will be redirected to the restaurant's homepage. 
                                                The restaurant homepage is the page where all the restaurants informations lays on, as a matter of fact the page can be break down into 3 sections. The top section shows useful information of the restaurant, such as 
                                                the street, the price range, the time to delivery or the type of restaurant it belongs to ('American','Sushi', etc). Just below there is an horizontal display composed of the categories of the products it contains.
                                                These category titles bring the user to the corresponding category on which each product will be accordingly displayed.  And here we find the last section, which is all the restaurant products shown with a title, a description
                                                and an image, everything selected by the restaurant, both the products and the categories. 
                                                
                                                Moreover, if the user is registered and logged in, he/she may mark any restaurant as 'Favourite', then creating a dynamic list on which every favourite restaurant will be shown. There is also a page where all 
                                                the favourites are displayed. The idea behind this is to allow registered customers to have an benefit as with regard to non-registered ones, helping them to browse and find appealing meals faster.

                                                In order to improve the user experience there is a working navigation bar, containg a reference to homepage UbEats, a search bar on which users can type and browse for any restaurant our servers have. Also it has
                                                a menu button which on click it will display a sidebar that will show either some Log In / Registering options in case the user is not logged in or its personal information with some extra functionalities described before.
                                                Actually those functionalities are a Favourites shortcut button which will redirect to its favourites restaurant page, and the profile page of its account. This last page contains all the personal information of 
                                                the customer in a styled way, and allows the customer to make some changes to actual fields.
                                                </b>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    </Accordion>
                                </Card>
                        </Tab.Pane>
                        <Tab.Pane eventKey="developerFeatures">
                        <Card>
                        <Accordion defaultActiveKey="3">
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                                    <b>Features (Customer)</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                        <p>
                                                As a customer, a registered user, we have several features to be talked about and are worth mentioning.
                                                First of all, as a visitor you can choose to surf around the website with almost no restriction at all. But at any moment you can sign in (if you already have an accout) or register.
                                                In terms of registration there are 3 possibilities, one for customers (main purpose), one for restaurants and one for users who wants to work as deliveryman. Even though there are 3 registration pages, 
                                                the login is shared through all of them but the website has only the customer view (first one).
                                                </p>
                                            <p>
                                                On entering onto the website for the first time we can see a similar style to Ubereats, in fact most of the style is based on ubereats official website. The page shown as entering is called Homepage, 
                                                here we can explore the affilliated restaurants easily, seeing for each restaurant  its name ( per example 'McDonald') and a representative image of it. What's more, each restaurant is categorized into one of the 13 possible categories,
                                                allowing viewers to reduce the search time and aim towards its wishes. In fact, each icon filters restaurants and shows only the restaurants belonging to that specific category. It is worth mentioning that the homepage shows 
                                                a variety of top restaurants and every restaurant at the same time the user continues to scroll down.
                                                A user can click on whichever restaurant he/she wants ( either the image or the title) and will be redirected to the restaurant's homepage. 
                                                The restaurant homepage is the page where all the restaurants informations lays on, as a matter of fact the page can be break down into 3 sections. The top section shows useful information of the restaurant, such as 
                                                the street, the price range, the time to delivery or the type of restaurant it belongs to ('American','Sushi', etc). Just below there is an horizontal display composed of the categories of the products it contains.
                                                These category titles bring the user to the corresponding category on which each product will be accordingly displayed.  And here we find the last section, which is all the restaurant products shown with a title, a description
                                                and an image, everything selected by the restaurant, both the products and the categories. 
                                                </p>
                                            <p>
                                                Moreover, if the user is registered and logged in, he/she may mark any restaurant as 'Favourite', then creating a dynamic list on which every favourite restaurant will be shown. There is also a page where all 
                                                the favourites are displayed. The idea behind this is to allow registered customers to have an benefit as with regard to non-registered ones, helping them to browse and find appealing meals faster.
                                                </p>
                                            <p>
                                                In order to improve the user experience there is a working navigation bar, containg a reference to homepage UbEats, a search bar on which users can type and browse for any restaurant our servers have. Also it has
                                                a menu button which on click it will display a sidebar that will show either some Log In / Registering options in case the user is not logged in or its personal information with some extra functionalities described before.
                                                Actually those functionalities are a Favourites shortcut button which will redirect to its favourites restaurant page, and the profile page of its account. This last page contains all the personal information of 
                                                the customer in a styled way, and allows the customer to make some changes to actual fields.
                                                </p>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    </Accordion>
                                </Card>
                        </Tab.Pane>
                        <Tab.Pane eventKey="technologiesUsed">
                        </Tab.Pane>
                        <Tab.Pane eventKey="chainOfWork">
                        </Tab.Pane>
                        <Tab.Pane eventKey="leitmotiv">
                        </Tab.Pane>
                        <Tab.Pane eventKey="members">
                            
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

        
          {/* 
        <Tabs defaultActiveKey="ourWebsite" id="wikitab" className='custom-tab-bg 'className='flex-column'>
                <Nav.Link eventKey="ourWebsite" title="Our Website" >
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
                <Nav.Link eventKey="customerFeaturesTab" title="Customer Features">
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
                <Nav.Link eventKey="developerFeatures" title="Developer Features">
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
                <Nav.Link eventKey="technologiesUsed" title="Technologies Used">
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
                <Nav.Link eventKey="chainOfWork" title="Chain of Work">
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
                <Nav.Link eventKey="leitmotiv" title="Leitmotiv of Retrospectives">
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
                <Nav.Link eventKey="members" title="Meet the Team">
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
            */}
       

            

        </Container>

        
        

        </section>
    );

}

export default Wiki;
