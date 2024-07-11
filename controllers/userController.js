const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
    // Get all the users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate("thoughts", "friends");
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // get a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.userId,
            }).populate("thoughts", "friends");

            if (!user) {
                res.status(404).json({ message: `No user found!` });
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // create a user
    // {
    //     "username": "lernantino",
    //     "email": "lernantino@gmail.com"
    //   }
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.userId,
            });

            if (!user) {
                res.status(404).json({ message: "No user found!" });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: "User and thoughts deleted!" });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: "No user found!" });
            }

            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
};
