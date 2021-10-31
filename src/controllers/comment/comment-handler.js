import mainDB from "../../libs/database";
import Model from "./comment-model";

class CommentHandler {
  constructor() {
    this.db = mainDB;
    this.model = new Model();
  }

  getComments = async (req, res) => {
    try {
      const { post_id } = req.params;

      const result = await this.db.tx((trx) =>
        this.model.getComments(trx, post_id)
      );
      // const result = await this.model.getComments(this.db, post_id);

      return res.status(200).send({ data: result });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  createComment = async (req, res) => {
    try {
      const session = req.user;
      const { body } = req;
      body.post_id = req.params.post_id;
      const result = await this.model.createComment(this.db, session, body);

      return res.status(200).send({ data: result });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default new CommentHandler();
