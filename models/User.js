const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: {
            type: String,
            required: [true, "User email required"],
            unique: true,
            match: [/.+@.+\..+/, "Please fill a valid email address"],
        },
        thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
        friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
    },
    { toJSON: { virtuals: true }, id: false }
);

// virtual
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
