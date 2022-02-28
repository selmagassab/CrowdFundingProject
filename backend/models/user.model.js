const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'),
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
   firstname: {
    type: String,
    required: true,
    minlength: [3, 'First Name Minimum 3 charachters.'],
  },
  lastname: {
      type: String,
    required: true,
    minlength: [3, 'Last Name Minimum 3 charachters.'],
  },
  mailAddress: {
      type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password:{
      type: String,
    required: true,
    minlength: [6, 'Password Minimum 6 charachters.'],
  },
}, {
  timestamps: true,
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model('User', userSchema);

module.exports = User;