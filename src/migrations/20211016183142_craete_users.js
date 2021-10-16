
exports.up = function(knex) {
  return knex.schema.raw(`
   create table if not exists users(
    user_id serial primary key,
    username varchar not null,
    email varchar not null,
    profile_pic varchar,
    password varchar not null,
    bio text,
    created_at timestamptz
   );
  `)
};

exports.down = function(knex) {
  return knex.schema.raw(`
    drop table if exists users;
  `)
};
