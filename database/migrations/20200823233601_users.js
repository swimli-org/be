exports.up = function(knex) {
    return knex.schema
    .createTable('users', function(users) {
      users.increments('id');
      users.string('first_name').notNullable();
      users.string('last_name').notNullable();
      users.string('email').notNullable().unique();
      users.string('password').notNullable();
      users.string('street_address');
      users.string('apt/suite/other');
      users.string('city');
      users.string('state');
      users.string('zip');
    })
    .createTable('products', function(products) {
        products.increments('id');
        products.string('sku').unique();
        products.string('brand')
        products.string('name')
        products.string('price')
        products.boolean('isInStock').defaultTo(false)
        products.string('category')
        products.string('tag');
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('products');
};