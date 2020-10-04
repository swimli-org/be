const db = require('../database/dbConfig.js');

module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
    getBy,
    getUserProducts,
  };

  function get() {
    return db('cartItem');
  }

  function getById(id) {
    return db('cartItem')
      .where({ id })
      .first();
  }

  function getBy(filter) {
    return db('cartItem').where(filter);
  }
  function insert(user) {
    return db('cartItem')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }
  
  function update(id, changes) {
    return db('cartItem')
      .where({ id })
      .update(changes)
      
  }
  
  function remove(id) {
    return db('cartItem')
      .where('id', id)
      .del();
  }
  function getUserProducts(userId) {
    return db('cartItem')
      .join('users', 'users.id', 'cartItem.user_id')
      .join('products', 'products.id', 'cartItem.product_id')
      .select('*','cartItem.id AS cartItem_id', 'products.id AS product_id', 'users.id AS user_id')
      .where('cartItem.user_id', userId);
  }