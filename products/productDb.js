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
    return db('products');
  }

  function getById(id) {
    return db('products')
      .where({ id })
      .first();
  }

  function getBy(filter) {
    return db('products').where(filter);
  }
  function insert(user) {
    return db('products')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
  
  function update(id, changes) {
    return db('products')
      .where({ id })
      .update(changes)
      
  }
  
  function remove(id) {
    return db('products')
      .where('id', id)
      .del();
  }
