const { User, Thought } = require("../models");
const { findOne } = require("../models/User");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // get a user by id
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // get all thoughts or, if passed a username, a single user's thoughts
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // get a thought by id
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
  },
};

module.exports = resolvers;
