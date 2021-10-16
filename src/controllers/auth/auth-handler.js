import mainDB from "../../libs/database";
import Bcrypt from "bcrypt";
import { generateToken, gererateToken } from "../../libs/auth";

class AuthHandler {
  constructor() {
    this.db = mainDB;
  }

  register = async (req, res) => {
    try {
      const { body } = req;
      const checkEmail = await this.db.oneOrNone(
        `
        SELECT email FROM users WHERE email = $1
      `,
        body.email
      );

      if (checkEmail) {
        return res.status(400).send({ message: "Email telah terdaftar" });
      }

      // Generate password
      const salt = Bcrypt.genSaltSync(10);
      body.password = Bcrypt.hashSync(body.password, salt);

      await this.db.query(
        `INSERT INTO users(username, email, password, created_at) 
        VALUES($<username>, $<email>, $<password>, now())`,
        body
      );
      return res.status(200).send({ message: "Registrasi berhasil." });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { body } = req;

      //Check user data from database
      const checkUser = await this.db.oneOrNone(
        `
        select email, password, username, user_id from users where email = $1 or username = $1 limit 1
      `,
        body.username
      );

      if (!checkUser) {
        return res.status(400).send({ message: "Akun tidak ditemukan" });
      }

      const comparePassword = Bcrypt.compareSync(
        body.password,
        checkUser.password
      );

      if (!comparePassword) {
        return res.status(400).send({ message: "Password anda salah" });
      }

      // Generate token from jsonwebtoken
      const token = generateToken(checkUser);

      return res
        .status(200)
        .send({ message: "Login berhasil", data: checkUser, token });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  };
}

export default new AuthHandler();
