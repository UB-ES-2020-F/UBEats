import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Container, Accordion, Card, Button, Row, Col, Nav, TabContainer} from 'react-bootstrap';

import './Wiki.css';


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
                            <Nav.Link eventKey="customerFeaturesTab"> Features</Nav.Link>
                        </Nav.Item>

                        
                        <Nav.Item>
                            <Nav.Link eventKey="technologiesUsed" >Technologies Used</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item>
                            <Nav.Link eventKey="chainOfWork" >Chain of Work</Nav.Link>
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
                                        
                                            Have you ever been sitting on your sofa and thinking 'Oh man I'd really like some pizza' but didn't want to go to a restaurant or prepared all by yourself? 
                                            That's why we have developed UbEats, a website where you can order from your favourities restaurants in the comfort of your home!
                                            It is as simple as going to our website https://ub-gei-es-ubeats-clone.herokuapp.com/, log in if you already have an account and start ordering with only one click!
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
                                            UbEats is a webstie clone of Ubereats, the purpose of the creation of such website is purely educational on how to recreate a website from scratch. Therefore the license applied to UbEats project is MIT and 
                                            all credits to  @2020 Uber Technologies Inc. on https://ubereats.com. The main differences find between these two are due to lack of time or money ( pe : hosting, domain) but the whole UbEats tries to be as similar to Ubereats 
                                            as possible. 
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
                                       
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>
                                
                            </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="customerFeaturesTab">
                            <Accordion defaultActiveKey="customerFeaturesTab-1">
                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="customerFeaturesTab-1">
                                    <b>Non-logged customer features</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="customerFeaturesTab-1">
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
                                        </p>
                                        <p>
                                            A user can click on whichever restaurant he/she wants ( either the image or the title) and will be redirected to the restaurant's homepage. 
                                            The restaurant homepage is the page where all the restaurants informations lays on, as a matter of fact the page can be break down into 3 sections. The top section shows useful information of the restaurant, such as 
                                            the street, the price range, the time to delivery or the type of restaurant it belongs to ('American','Sushi', etc). Just below there is an horizontal display composed of the categories of the products it contains.
                                            These category titles bring the user to the corresponding category on which each product will be accordingly displayed.  And here we find the last section, which is all the restaurant products shown with a title, a description
                                            and an image, everything selected by the restaurant, both the products and the categories. 
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>

                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="customerFeaturesTab-2">
                                    <b>Logged customer features</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="customerFeaturesTab-2">
                                    <Card.Body>
                                        
                                        <p>
                                            Moreover, if the user is registered and logged in, he/she may mark any restaurant as 'Favourite', then creating a dynamic list on which every favourite restaurant will be shown. There is also a page where all 
                                            the favourites are displayed. The idea behind this is to allow registered customers to have an benefit as with regard to non-registered ones, helping them to browse and find appealing meals faster.
                                        </p>

                                        <p>
                                            In order to improve the user experience there is a working navigation bar, containg a reference to homepage UbEats, a search bar on which users can type and browse for any restaurant our servers have. Also it has
                                            a menu button which on click it will display a sidebar that will show either some Log In / Registering options in case the user is not logged in or its personal information with some extra functionalities described before.
                                        </p>
                                        <p>
                                            Actually those functionalities are a Favourites shortcut button which will redirect to its favourites restaurant page, and the profile page of its account. This last page contains all the personal information of 
                                            the customer in a styled way, and allows the customer to make some changes to actual fields.
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>

                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="customerFeaturesTab-3">
                                    <b>Developer features</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="customerFeaturesTab-3">
                                    <Card.Body>
                                        <p>
                                            We, as a team, have developed an API on which every restaurant can retrieve its data in JSON format, allowing them to use it wherever they feel like to. For example, they can retrieve its data and displayed it onto 
                                            its personal website or extending its own database with. 
                                        </p>
                                        <p>
                                            In order to provide the corresponding information we have created an extensive README.txt, a document, on which the API endpoints are well documented and structured according to what is needed. This document is 
                                            accessible through the github page of the project, here is a link to it. 
                                        </p>
                                        <p>
                                            Also, as this project is entirely for educational purposes we added a step-by-step description on how to setup the project on your computer and mount it by yourself.
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>
                            </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="technologiesUsed">
                            <Accordion defaultActiveKey="technologiesUsed-1">
                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="technologiesUsed-1">
                                    <b>Development technologies</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="technologiesUsed-1">
                                    <Card.Body>
                                        <p>
                                            First of all, the project itself uses <a href='https://nodejs.org/en/' target='_blank'>Node.js </a>  as its core. 
                                        </p>
                                        <p>
                                            To develop the visual website we used on top of node <a href='https://reactjs.org/' target='_blank'>React.js</a>  and <a href='https://react-bootstrap.github.io/' target='_blank'>Bootstrap libraries</a>  to agilize the design process.
                                        </p>
                                        <p>
                                            To mount the API server we used <a href='https://expressjs.com/' target='_blank'>Express.js </a> to help create an API backend service. This server will only send data found inside the database, an SQL database, specifically a PostgresSQL database.
                                        </p>
                                        <p>
                                            To create a profitable continous integration and continous developtment pipelen we have chosen <a href='https://travis-ci.com/' target='_blank'>Travis.com </a> as it is free for Students and has incredibily useful functionalities.
                                        </p>
                                        <p>
                                            To test and assure our code is good enough we added a dynamic quality assurrance (Profiling) and an static one (ESLinting). Also each test run, either in backend or frontend is checked and if anything fails 
                                            travis catch it and prevents that code to be deployed.
                                        </p>
                                        <p>
                                            For testing purposed the technology used are : Mocha && Chai for backend.  
                                            All of this is send to Herouku, our hosting place where we deploy our code and executed in order to be seen as apage everywhere on the web.
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>

                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="technologiesUsed-2">
                                    <b>Work flow technologies</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="technologiesUsed-2">
                                    <Card.Body>
                                        <p>
                                            Second part of the techonlogies used is attached to the working part, in other words, how we create a work flow.
                                        </p>
                                        <p>
                                            To have a big picture of what have been done on each Sprint and what we are going to do we have Trello. Here we have created Epics, on which we derivated the most ambitious UserStories with its 
                                            Acceptance Criteria. We have tried to be as exhaustive as possible, adding images if necesarry to specify how things have to be.
                                            We used GitHub as our 'coding host' and as our Project Kanban on which our issues/tasks will be added to the project, assigned and discussed if necesarry. Everything that is needed to do a task is inside the 
                                            issue.
                                        </p>
                                        <p>
                                            Here we would like to explain the evolution of our card issues, how they started and how they have been evolving through the entire process.
                                            Initially cars had a title composed of [UserStoy-#id] Title of the task, a simple description, the sprint number (milestone), the people that has been assigned to and some descriptive labels.
                                            The problem with this is that the description was not exhaustive, creating then a miscommunication on what is required to mark the issue as Done. Here we found another problem, what is DONE was different
                                            for each member and we had to define as a team what a Done Issue is and what is not. Moreover everytime we finished an Sprint we spent too much time counting and keeping track of the real hours and the 
                                            planned hours. For that reason we added a new element in the title : #HOURS that are the planned hours of the task. Also the description began to be as detailed as needed, which help a lot when members 
                                            had to work on the tasks. 
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>

                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="technologiesUsed-3">
                                    <b>Communication technologies</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="technologiesUsed-3">
                                    <Card.Body>
                                        <p> 
                                            Finally, these are the technologies used to communicate with each other.
                                            For standup meetings we used Discord as our main platform. We created 3 channels: General (standup and retrospective mainly), Frontend and Backend. Each channel served its purpose and help the team be organized.
                                            The Discord option was made because of the simplicity of the platform and because it allows us to share screen at any moment helping members focus its attention on whats being done.
                                            For daily communication we used Slack. In Slack there are several things that are worth mentioning : 
                                        </p>
                                        <p> 
                                            We created as many channels as needed in order to have the information and problems project related well organized. Because of that we have : backend, front-end, devops and general.
                                        </p> 
                                        <p> 
                                            We created extra channels for RRHH topics : general-meeting (to schedule meetings), daily-meeting (3 questions answered by each member each standup meeting), 
                                            rrhh ( for personal problems or attendancy problems) and varios( as a support channel for anything extraofficial)
                                        </p>
                                        <p> 
                                            We created automatic channels to help us be aware of all the changes being made. This channels are connected to external apps : github-log, travis-ci and trello-log
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>
                                
                            </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="chainOfWork">
                            <Accordion defaultActiveKey="chainOfWork-1">
                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="chainOfWork-1">
                                    <b>Chain of work</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="chainOfWork-1">
                                    <Card.Body>
                                        <p>
                                            Here is an example of how we develop an issue and what are the steps we followed each time.
                                        </p>
                                        <p>
                                            0. All Trello US with is corresponding Acceptance Criteria are updated as well as the priority of each one.
                                        </p>
                                        <p>
                                            1. Create new tasks from most important US during Sprint beginning
                                        </p>
                                        <p>
                                            2. Once all the new task have been created each member choose the tasks that will require at least the minimum amount of hours established (8 hours). Each task has 
                                        </p>
                                        <p>
                                            3. Once tasks have been defined and assigned, members create its corresponding GitHub issue on which the product owner will add the Acceptance Criteria.
                                        </p>
                                        <p>
                                            4. Each member, on starting to develop an issue, moves the issue to 'Develop' column.
                                        </p>
                                        <p>
                                            5. Once the issue is done is moved to 'Develop -> Done' column, where the member will push a new pull request adding at least 2 reviewers : the PO and another member of the same category.
                                        </p>
                                        <p>
                                            6. If the pull request is not accepted, the issue is moved to Testing where the assignee will commit the requested changes. Once the changes are pushed the previous reviewers will review it until 
                                            it is approved. Once the pull request is accepted it is merged into main branch, deploying it into Heroku.
                                        </p>
                                        <p>
                                            7. Automatically, as the pull request has the issue linked, this issue will be close and send to 'Done' column. 
                                        </p>
                                        <p>
                                            8. The member then goes again into step 4 until all of its issues are 'Done'.
                                        </p>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>

                                
                            </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="members">
                            <Accordion defaultActiveKey="members-1">
                                <Row>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="members-1">
                                    <b>Members</b>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="members-1">
                                    <Card.Body>
                                        <div className='ml-3'>
                                            <ul >
                                                <li>
                                                    <strong> <a href='https://github.com/danielruizbasas' target="_blank"> Daniel Ruiz </a> </strong>: Frontend developer.
                                                </li>
                                                <li>
                                                    <strong> <a href='https://github.com/Samuroldan' target="_blank">Samuel Roldan</a> </strong>: Frontend developer (mostly visual aspects).
                                                </li>
                                                <li>
                                                    <strong> <a href='https://github.com/Rbb93' target="_blank">Ruben Blanco</a></strong>: Backend developer ( database schema designer).
                                                </li>
                                                <li>
                                                    <strong> <a href='https://github.com/aldakata' target="_blank">Albert Catala</a></strong>: Frontend developer of the team (functional and visual aspects).
                                                </li>
                                                <li>
                                                    <strong><a href='https://github.com/oriolOrnaque' target="_blank"> Oriol Ornaque</a></strong>: DevOps of the team, Backend developer.
                                                </li>
                                                <li>
                                                    <strong> <a href='https://github.com/hectorAlarcon' target="_blank">Hector Alarcon</a></strong>: Product owner of the team, Backend developer.
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                </Row>
                            </Accordion>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        </Container>

        
        

        </section>
    );

}

export default Wiki;
