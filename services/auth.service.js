const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mongo = require("../shared/mongo");
const schema = require("../shared/schema");

const service = {
  async register(req, res) {

    try {
      let data = req.body;

      // Input Validation
      const { error } = schema.register.validate(data);
      if (error)
        return res.status(400).send({ error: error.details[0].message });

      // Email Validation
      const user = await service.findByEmail(data.email);
      if (user)
        return res.status(400).send({ error: "User already registered" });

      // Encrypt Password
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);

      //   Insert User
      await mongo.db.collection("users").insertOne(data);

      //   Send success response
      res.send({ message: "Registered successfully !" });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Internal server error" });
    }
  },

  async login(req, res) {
    try {
      let data = req.body;

      // Input Validation
      const { error } = schema.login.validate(data);
      if (error)
        return res.status(400).send({ error: error.details[0].message });

      // User Validation
      const user = await service.findByEmail(data.email);
      if (!user)
        return res
          .status(403)
          .send({ error: "Username or password is incorrect" });

      // Compare Password
      const isValid = await bcrypt.compare(data.password, user.password);
      if (!isValid)
        return res
          .status(403)
          .send({ error: "Username or password is incorrect" });

      // Generate JWT
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "8h",
      });

      // Send the token
      res.send({ token });
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "Internal server error" });
    }
  },

  findByEmail(email) {
    return mongo.db.collection("users").findOne({ email });
  },
};

module.exports = service;
