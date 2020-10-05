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
    return db('autoship_items');
  }

  function getById(id) {
    return db('autoship_items')
      .where({ id })
      .first();
  }

  function getBy(filter) {
    return db('autoship_items').where(filter);
  }
  function insert(user) {
    return db('autoship_items')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
  
  function update(id, changes) {
    return db('autoship_items')
      .where({ id })
      .update(changes)
      
  }
  
  function remove(id) {
    return db('autoship_items')
      .where('id', id)
      .del();
  }
