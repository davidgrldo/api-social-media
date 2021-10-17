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

  async createPost(db, session, body, file) {
    try {
      body.user_id = session.user_id;
      const result = await db.one(
        `
          insert into posts(user_id, content, created_at)
          values ($<user_id>, $<content>, now())
          returning post_id
        `,
        body
      );

      if (file) {
        body.image = file ? file.filename : null;
        body.post_id = result.post_id;
        await db.query(
          `
            update posts set image = $<image> where post_id = $<post_id>
          `,
          body
        );
      }

      return result;
    } catch (error) {
      return error;
    }
  }
}

export default Model;
