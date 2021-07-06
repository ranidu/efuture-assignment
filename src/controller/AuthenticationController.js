import { User } from "../model/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import config from "config";
import Validator from "../util/Validator";

export default class AuthController {
  static async login(req, res) {
    try {
      //validate user credentials.
      const { error } = Validator.Login(req.body);
      if (error)
        //if validation failed throw an error.
        return res.status(400).send({
          error_code: "validation_error",
          errors: {
            message: error.details[0].message,
            field: error.details[0].path,
          },
        });
      //get relevant user  
      let user = await User.findOne({ email: req.body.email });
      if (!user)
        //if user not found throw an error
        return res.status(400).send({
          error_code: "invalid_login",
          message: "Invalid email of password",
        });

      //match password
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword)
        //if password not matched throw an error.
        return res.status(400).send({
          error_code: "invalid_login",
          message: "Invalid email of password",
        });

      //generating JWT token with secret key.   
      const token = jwt.sign(
        { id: user.id },
        process.env.AUTH_KEY || config.get("secretKey"),
        { expiresIn: "1h" }
      );
      user = _.pick(user, [
        "id",
        "firstName",
        "lastName",
        "email",
        "createdAt",
      ]);
      user.token = token;

      //send logged in user information
      res.send(user);
    } catch (e) {
      console.log(e);
    }
  }

  static async logout(req, res) {
    if(req.user){
      delete req.user;
    }

    res.send({
      message: "User had been successfully logged out."
    });
  }
}