const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    salt: String,
    encry_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return bcrypt.compareSync(plainpassword, this.encry_password);
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainpassword, salt);
    } catch (err) {
      return err;
    }
  },
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
