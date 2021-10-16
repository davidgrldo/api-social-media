exports.up = function (knex) {
  return knex.schema.raw(`
    create table if not exists followings(
      following_id serial primary key,
      followed_user_id integer,
      following_user_id integer,
      constraint followings_followed_user_id_fkey foreign key (followed_user_id)
      references users(user_id),
      constraint followings_following_user_id_fkey foreign key (following_user_id)
      references users(user_id)
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw(`
    drop table if exists followings;
  `);
};
