exports.up = function(knex) {
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    // not null
    commentsTable
      .string("author")
      .references("users.username")
      .notNullable();
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable
      .timestamp("created_at")
      .defaultTo(knex.fn.now())
      .notNullable();
    commentsTable.string("body", 1000).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
