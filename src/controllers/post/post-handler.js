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
}

export default new PostHandler();
