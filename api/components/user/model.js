const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config  = require('../../config');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   lastname: {
      type: String,
      required: true,
      trim: true
   },
   typeUser: {
      type: Number,
      required: true
   },
   photo: {
      type: String,
      required: true,
      trim: true
   },
   date: {
      type: Date,
      default: Date.now
   },
   email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: value => {
         if (!validator.isEmail(value)) {
            throw new Error({error: 'Invalid Email address'})
         }
      }
   },
   google_id : {
      type: String
   },
   facebook_id : {
      type: String
   },
   password: {
      type: String,
      minLength: 7
   },
   driver: {
       type: Schema.ObjectId,
       ref: 'ProfileDriver',
   },
   company: {
       type: Schema.ObjectId,
       ref: 'ProfileCompany',
   },
   tokens: [{
      token: {
         type: String,
         required: true
      },
      date: {
         type: Date,
         default: Date.now
      }
   }]
 })
 
 userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
       user.password = await bcrypt.hash(user.password, 8);
    }
    next();
 })
 
 userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this;
    const token = jwt.sign({_id: user._id}, config.JWT_KEY);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
 }
 
 userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    if (!validator.isEmail(email)) {
      throw new Error({ error: 'Invalid login credentials' });
    }
    const user = await User.findOne({ email} )
      .select("-__v")
      .populate('driver', "-_id -__v")
      .populate('company', "-_id -__v");

    if (!user) {
       throw new Error({ error: 'Invalid login credentials' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
       throw new Error({ error: 'Invalid login credentials' });
    }
    return user;
 }

   userSchema.methods.findByProvider = async (provider_id) => {
      if (!provider_id) {
         throw new Error({ error: 'Invalid provider credentials' });
      }
      const user = await User.findOne({provider_id} );
      if (!user) {
         throw new Error({ error: 'Invalid login credentials' });
      }
      
      return user;
   }
 
 const User = mongoose.model('User', userSchema);
 module.exports = User;