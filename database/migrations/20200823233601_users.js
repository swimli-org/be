exports.up = function(knex) {
    return knex.schema
    .createTable('users', function(users) {
      users.increments('id').primary();
      users.string('first_name').notNullable();
      users.string('last_name').notNullable();
      users.string('email').notNullable().unique();
      users.string('password').notNullable();
      users.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .createTable('address', function(address) {
      address.increments('id').primary();
      address.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      address.string('first_name').notNullable();
      address.string('last_name').notNullable();
      address.string('street_address');
      address.string('apt/suite/other');
      address.string('city');
      address.string('state');
      address.string('zip');
      address.string('country').defaultTo('USA')
      address.timestamp('created_at').defaultTo(knex.fn.now())
    })
    
    .createTable('products', function(products) {
        products.increments('id').primary()
        products.string('sku').unique();
        products.string('brand')
        products.string('name')
        products.string('description')
        products.string('price')
        products.string('category')
        products.string('sub_category')
        products.integer('weight_lbs')
        products.integer('inventory')
        products.integer('low_inventory_threshold')
      })
      .createTable('product_media', function(product_media) {
        product_media.increments('id').primary()
        product_media.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate("CASCADE")
        .onDelete("CASCADE")
        product_media.string('img_path')
        product_media.string('video_path')
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
      .createTable('discount', function(discount) {
        discount.increments('id')
        discount.string('name')
        discount.float('value')
      })
      .createTable('orders', function(orders) {
        orders.increments('id');
        orders.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate("CASCADE")
        .onDelete("CASCADE")
        orders.integer('address_id').unsigned().notNullable().references('id').inTable('address').onUpdate("CASCADE")
        .onDelete("CASCADE")
        orders.integer('discount_id').unsigned().notNullable().references('id').inTable('discount').onUpdate("CASCADE")
        .onDelete("CASCADE")
        orders.timestamp('created_at')
        orders.timestamp('modified_at')
        orders.string('status')
        orders.string('amount')
        orders.string('tracking_number');

      })
      .createTable('order_items', function(order_items) {
        order_items.increments('id')
        order_items.integer('order_id').unsigned().notNullable().references('id').inTable('orders').onUpdate("CASCADE")
        .onDelete("CASCADE")
        order_items.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate("CASCADE")
        .onDelete("CASCADE")
        order_items.integer('quantity')
      })
      .createTable('tags', function(tags) {
        tags.increments('id')
        tags.integer('product_id').unsigned().notNullable().references('id').inTable('products').onUpdate("CASCADE")
        .onDelete("CASCADE")
        tags.string('tag_name')
      })
      .createTable('autoship', function(autoship) {
        autoship.increments('id');
        autoship.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate("CASCADE");
        autoship.string('autoship_start_date');
        autoship.string('frequency')
        autoship.string('last_ship_date')
        autoship.string('next_ship_date')
      })
      .createTable('autoship_items', function(autoship_items) {
        autoship_items.increments('id');
        autoship_items.integer('autoship_id').unsigned().notNullable().references('id').inTable('autoship').onUpdate("CASCADE");
      })

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('address').dropTableIfExists('products').dropTableIfExists('product_media').dropTableIfExists('cartItem').dropTableIfExists('discount').dropTableIfExists('orders').dropTableIfExists('order_items').dropTableIfExists('tags');
};