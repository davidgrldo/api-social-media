class Model {
  async getComments(db, postId) {
    return db.query(
      `
        SELECT c.*, u.username, u.profile_pic
        FROM comments c
        JOIN users u ON u.user_id = c.user_id
        WHERE post_id = $1
        ORDER BY created_at DESC
      `,
      postId
    );
  }

  async createComment(db, session, body) {
    try {
      body.user_id = session.user_id;
      const result = await db.one(
        `
          INSERT INTO comments
            (post_id, user_id, content, created_at)
          VALUES
            ($<post_id>, $<user_id>, $<content>, now())
          RETURNING comment_id
        `,
        body
      );

      return result;
    } catch (error) {
      return error;
    }
  }
}

export default Model;
