const jwt = require('jsonwebtoken');
const {User} = require('../components/user/model');
const config = require('../config');

module.exports = function auth(typeUserReq = 0){
   return async(req, res, next) => {
      try {
         const token = req.header('Authorization').replace('Bearer ', '');
         const data = jwt.verify(token, config.JWT_KEY);
         const user = await User.findOne({ _id: data._id, 'tokens.token': token });
         if (!user) {
            throw new Error();
         }
         const {_id, name, lastname, email, typeUser, driver, company} = user;
         if(typeUserReq > 0){
            if(typeUser != typeUserReq){
               throw new Error();
            }
         }
         req.user = {_id, name, lastname, email, typeUser, driver, company};
         req.token = token;
         next();
      } catch (error) {
         console.log(error);
         res.status(401).send({ error: 'Not authorized to access this resource' });
      }
   
   }
};