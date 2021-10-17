import mainDB from "../../libs/database";
import Model from "./post-model";

class PostHandler {
  constructor() {
    this.db = mainDB;
    this.model = new Model();
  }
  getPosts = async (req, res) => {
    try {
      const session = req.user;
      const result = await this.model.getPosts(this.db, session);

      return res.status(200).send({ message: result });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  createPost = async (req, res) => {
    try {
      const session = req.user;
      const { body, file } = req;
      const result = await this.model.createPost(this.db, session, body, file);

      return res.status(200).send({ data: result });
    } catch (error) {
      return res.status(500).send({ message: error });
    }
  };
}

export default new PostHandler();
