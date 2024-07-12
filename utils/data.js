// for users
let users = ["udit25", "jaimy45", "zeenat33", "sharukh66", "robert99"];

let emailAddress = [
    "hello123@gmail.com",
    "james@gmail.com",
    "zee34@gmail.com",
    "yoyo@gmail.com",
    "hell66@gmail.com",
];

// for thoughts
let posts = [
    "birthday night",
    "graduated today",
    "paid all the college debt",
    "prom-night",
    "proposal accepted",
];

// for reactions
let comments = ["amazing", "wonderful", "nice", "cheers", "proud of you"];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// random username
const getRandomUser = () => `${getRandomArrItem(users)}`;

// random email
const getRandomEmail = () => `${getRandomArrItem(emailAddress)}`;

// random thought
const getRandomThought = () => `${getRandomArrItem(posts)}`;

// random reaction
const getRandomReaction = () => `${getRandomArrItem(comments)}`;

module.exports = {
    getRandomUser,
    getRandomThought,
    getRandomReaction,
    getRandomEmail,
};
