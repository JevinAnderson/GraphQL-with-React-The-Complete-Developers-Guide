const axios = require('axios');

module.exports = {
  get: (...args) => axios.get(...args).then(res => res.data),
  post: (...args) => axios.post(...args).then(res => res.data),
  delete: (...args) => axios.delete(...args).then(res => res.data)
};
