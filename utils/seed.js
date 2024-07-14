const connection = require("../config/connection");
const { User, Thought } = require("../models");
const {
    getRandomUser,
    getRandomThought,
    getRandomReaction,
    getRandomEmail,
} = require("./data");

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

    // Create an array for thoughts
    let thoughts = [];

    // Loop to add the thoughts
    for (let i = 0; i < 5; i++) {
        const thoughtText = getRandomThought();
        const username = getRandomUser();

        // Create reactions array for each thought
        let reactions = [];
        for (let j = 0; j < 5; j++) {
            const reactionBody = getRandomReaction();
            let username = getRandomUser();
            reactions.push({ reactionBody, username });
        }

        thoughts.push({ thoughtText, reactions, username });
    }

    // Add thoughts to the collection
    const thoughtData = await Thought.create(thoughts);

    // Create an array for users
    let users = [];
    let userNameSelected = [];
    let emailUsed = [];
    for (let i = 0; i < 5; i++) {
        const username = getRandomUser();
        const email = getRandomEmail();

        if (
            !userNameSelected.includes(username) &&
            !emailUsed.includes(email)
        ) {
            const userThoughts = thoughtData.filter(
                (thought) => thought.username == username
            );

            users.push({
                username,
                email,
                thoughts: userThoughts.map((userThought) => userThought),
                friends: [],
            });
            emailUsed.push(email);
            userNameSelected.push(username);
        }
    }

    // adding users to the collections
    await User.create(users);

    // Showing the seed data
    console.table(users);
    console.table(thoughts);
    console.info(`Seeding complete`);
    process.exit(0);
});
