import jwt from 'jsonwebtoken';
import config from 'config';

export default function authenticator(req, res, next){
    //validate user request
    let token = req.header('Authorization');
    if(!token) return res.status(401).send({error_code: "token_not_found", message:"Access denied!. No token provied"});

    try{
        token = token.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.AUTH_KEY || config.get("secretKey"));
        req.user = decoded;
        //navigate to next middleware
        next();
    }catch(e){
        res.status(401).send({error_code: "invalid_token", message: "Invalid Token"});
    }
}