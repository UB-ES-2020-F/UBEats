import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});


//https://bezkoder.com/react-hooks-crud-axios-api/ following this tutorial
