import { User } from "../model/User";
import bcrypt from "bcrypt";
import _ from "lodash";
import Validator from "../util/Validator";

export default class UserController {
  static async create(req, res) {
    try {
      //validate inputs.
      const { error } = Validator.Register(req.body);
      if (error)
        //if validation failed throw an error.
        return res.status(400).send({
          error_code: "validation_error",
          errors: {
            message: error.details[0].message,
            field: error.details[0].path,
          },
        });
      
      //check user already exists  
      let user = await User.findOne({ email: req.body.email });
      if (user)
        //if user exists throw an error.
        return res.status(400).send({
          error_code: "user_already_exists",
          message: "User already registered",
        });

      user = _.pick(req.body, ["firstName", "lastName", "email", "password"]);

      //hash password before save into table
      const password_salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, password_salt);

      //create user on table
      user = await User(user).save();
      //send created user information.
      res.send(
        _.pick(user, ["_id", "firstName", "lastName", "email", "createdAt"])
      );
    } catch (e) {
      console.log(e);
    }
  }

  static async view(req, res) {
    try{
      //get current loggedin user information
      let { user } = req;
      if(!user){
        return res.status(404).send({
          error_code: "user_not_found",
          message: "User not available",
        });
      }
      //send loggedin user information
      res.send(
        _.pick(user, ["_id", "firstName", "lastName", "email", "createdAt"])
      );
    }catch(e){
      console.log(e)
    }
  }
}