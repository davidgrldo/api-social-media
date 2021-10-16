exports.up = function (knex) {
  return knex.schema.raw(`
    create table if not exists posts(
      post_id serial primary key,
      user_id integer,
      content text,
      image varchar,
      created_at timestamptz,
      updated_at timestamptz,
      constraint user_posts_user_id_fkey foreign key(user_id)
      references users(user_id)
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw(`
    drop table if exists posts;
  `);
};
