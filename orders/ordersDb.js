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
    return db('orders');
  }

  function getById(id) {
    return db('orders')
      .where({ id })
      .first();
  }

  function getBy(filter) {
    return db('orders').where(filter);
  }
  function insert(user) {
    return db('orders')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
  
  function update(id, changes) {
    return db('orders')
      .where({ id })
      .update(changes)
      
  }
  
  function remove(id) {
    return db('orders')
      .where('id', id)
      .del();
  }
