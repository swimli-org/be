exports.up = function(knex) {
    return knex.schema
    .createTable('users', function(users) {
      users.increments('id').primary();
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
        products.increments('id').primary()
        products.string('sku').unique();
        products.string('img_path')
        products.string('brand')
        products.string('name')
        products.string('description')
        products.string('price')
        products.string('category')
        products.string('sub_category')
        products.integer('weight_lbs')
        products.integer('inventory')
        products.string('tag');
      })
      .createTable('cartItem', function(cartItem) {
        cartItem.increments('id')
        cartItem.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate("CASCADE")
        .onDelete("CASCADE")
        cartItem.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate("CASCADE")
        .onDelete("CASCADE")
        cartItem.boolean('saved_for_later').defaultTo(false)
        cartItem.timestamp('created_at').defaultTo(knex.fn.now())
        cartItem.integer('quantity').defaultTo(1)
      })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('products');
};