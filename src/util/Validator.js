import joi from 'joi';

export default class Validator {
    static Register(user){
        const schema = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string(),
            email: joi.string().required().email(),
            password: joi.string().required().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')),
            rePassword: joi.ref('password')
        })
    
        return schema.validate(user);
    }

    static Login(args){
        const schema = joi.object({
            email: joi.string().required().email(),
            password: joi.string().required()
        })

        return schema.validate(args);
    }
}