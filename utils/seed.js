const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
    console.log("connected");

    // Deleting the collections if they already exist
    let userCheck = await connection.db
        .listCollections({ name: "users" })
        .toArray();
    if (userCheck.length) {
        await connection.dropCollection("users");
    }

    let thoughtCheck = await connection.db
        .listCollections({ name: "thoughts" })
        .toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection("thoughts");
    }

    // create an array for thoughts
    let thoughts = [];

    // loop to add the thoughts

    // get random thoughts

    // add thoughts to the collectioon
    const thoughtData = await Thought.create(thoughts);

    // add user to the collection
    await User.create({
        username,
        email,
        thoughts: [...thoughtData.map(({ id }) => _id)],
        friends,
    });

    // showing the seed data
    console.table(thoughts);
    console.info(`Seeding complete`);
    process.exit(0);
});
