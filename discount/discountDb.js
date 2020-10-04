const db = require('../database/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
    getBy,
  };
  function get() {
    return db('discount');
  }
  function getById(id) {
    return db('discount')
      .where({ id })
      .first();
  }
  function getBy(filter) {
    return db('discount').where(filter);
  }
  function insert(user) {
    return db('discount')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
  function update(id, changes) {
    return db('discount')
      .where({ id })
      .update(changes)   
  }
  function remove(id) {
    return db('discount')
      .where('id', id)
      .del();
  }