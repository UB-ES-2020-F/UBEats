import http from "../http-commons";

const getAll = () => {
  return http.get("/login");
};

const get = id => {
  return http.get(`/login/${id}`);
};

const create = data => {
  return http.post("/login", data);
};

const update = (id, data) => {
  return http.put(`/login/${id}`, data);
};

const remove = id => {
  return http.delete(`/login/${id}`);
};

const removeAll = () => {
  return http.delete(`/login`);
};


export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};
