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
    return db('tags');
  }

  function getById(id) {
    return db('tags')
      .where({ id })
      .first();
  }

  function getBy(filter) {
    return db('tags').where(filter);
  }
  function insert(user) {
    return db('tags')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
  
  function update(id, changes) {
    return db('tags')
      .where({ id })
      .update(changes)
      
  }
  
  function remove(id) {
    return db('tags')
      .where('id', id)
      .del();
  }
