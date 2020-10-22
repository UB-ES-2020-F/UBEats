
# Frontend
This project will be built using react, redux and webpack.
Other dependencies:
* react-bootstrap
* dotenv


## Project structure:
The structure is inspired by https://www.pluralsight.com/guides/how-to-organize-your-react-+-redux-codebase View-State Split, and by https://daveceddia.com/react-project-structure/.

commons - Contains all global components and containers.
    components - Contains all 'dumb' or presentational components, consisting only of HTML and styling.
    containers - Contains all corresponding components with logic in them. Each container will have one or more component depending on the view represented by the container. For example, HomePageContainer would have ArticleListComponent as well as CategoryComponent.
actions - All Redux actions
reducers - All Redux reducers
API - API connectivity related code. Handler usually involves setting up an API connector centrally with authentication and other necessary headers.
Utils - Other logical codes that are not React specific. For example, authUtils would have functions to process the JWT token from the API to determine the user scopes. 
images - Put the images in one place.
index.js - app initialitzation and ReactDOM.render call.
store.js - Redux store
routes.js - aggregates all routes together for easy access.