exports.up = function(knex) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.string("body", 2000).notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable
      .string("topic")
      .references("slug")
      .inTable("topics"); // fixed previous problem
    articlesTable.string("author").references("users.username");
    articlesTable.timestamp("created_at");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
