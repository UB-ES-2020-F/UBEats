import http from "../http-commons";

const getAll = () => {
  return http.get("/register");
};

const get = id => {
  return http.get(`/register/${id}`);
};

const create = data => {
  return http.post("/register", data);
};

const update = (id, data) => {
  return http.put(`/register/${id}`, data);
};

const remove = id => {
  return http.delete(`/register/${id}`);
};

const removeAll = () => {
  return http.delete(`/register`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};
