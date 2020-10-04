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
    return db('autoship');
  }

  function getById(id) {
    return db('autoship')
      .where({ id })
      .first();
  }

  function getBy(filter) {
    return db('autoship').where(filter);
  }
  function insert(user) {
    return db('autoship')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
  
  function update(id, changes) {
    return db('autoship')
      .where({ id })
      .update(changes)
      
  }
  
  function remove(id) {
    return db('autoship')
      .where('id', id)
      .del();
  }
