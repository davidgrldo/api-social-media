class Model {
  async getPosts(db, session) {
    return db.query(
      `
        select p.*, u.username, u.profile_pic, 
        (
          select count(*) from comments c
          where c.post_id = p.post_id 
        ) as total_comment,
        (
          select count(*) from likes l
          where l.post_id = p.post_id 
        ) as total_like
        from posts p
        join users u on u.user_id = p.user_id
        where p.user_id in (
          select followed_user_id
          from followings
          where following_user_id = $1
        ) or p.user_id = $1
        order by p.created_at desc
      `,
      session.user_id
    );
  }
}

export default Model;
