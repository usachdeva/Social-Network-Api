const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: {
            type: String,
            required: [true, "User email required"],
            unique: true,
            validate: {
                validator: function (value) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                    );
                },
                message: (input) => `${input.value} is not a valid email!`,
            },
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
