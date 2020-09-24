const jwt = require('jsonwebtoken');
const User = require('../components/user/model');
const config = require('../config');

const auth = async(req, res, next) => {
   const token = req.header('Authorization').replace('Bearer ', '');
   const data = jwt.verify(token, config.JWT_KEY);
   try {
      const user = await User.findOne({ _id: data._id, 'tokens.token': token });
      if (!user) {
         throw new Error();
      }
      const {_id, name, email, password} = user;
      req.user = {_id, name, email};
      req.token = token;
      next();
   } catch (error) {
      res.status(401).send({ error: 'Not authorized to access this resource' });
   }

}
module.exports = auth