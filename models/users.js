const mongoose = require("../database");

const Users = mongoose.model("users", {
  firstName: {
    type: String,
    required: [true, "name is required"]
  },
  lastName: {
    type: String,
    required: [true, "name is required"]
  },
  residenceCountry: {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    required: [true, "name is required"]
  },
  password: {
    type: String,
    required: [true, "name is required"]
  }
});
