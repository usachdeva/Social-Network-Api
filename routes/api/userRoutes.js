const router = require("express").Router();

// importing the functions
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require(`../../controllers/userController.js`);

// api/users
// to get all the users
// to add a user
router.route("/").get(getUsers).post(createUser);

// api/users/:userId
// to get a single user
// to update a user
// to delete a user
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
