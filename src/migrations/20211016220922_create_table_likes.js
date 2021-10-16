exports.up = function (knex) {
  return knex.schema.raw(`
    create table if not exists comments(
      comment_id serial primary key,
      post_id integer,
      user_id integer,
      content text,
      created_at timestamptz,
      updated_at timestamptz,
      constraint comments_user_id_fk foreign key (user_id)
      references users(user_id),
      constraint comments_post_id_fk foreign key (post_id)
      references posts(post_id)
    );

    create table if not exists likes(
      like_id serial primary key,
      user_id integer,
      created_at timestamptz,
      post_id integer,
      comment_id integer,
      constraint likes_user_id_fk foreign key (user_id)
      references users(user_id),
      constraint likes_post_id_fk foreign key (post_id)
      references posts(post_id),
      constraint likes_comment_id_fk foreign key (comment_id)
      references comments(comment_id)
    );
  `);
};

exports.down = function (knex) {
  return knex.schema.raw(`
    drop table if exists comments;
    drop table if exists likes;
  `);
};
