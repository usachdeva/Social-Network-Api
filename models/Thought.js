const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleString(),
        },
        username: { type: String, required: true, ref: "User" },
        reactions: [reactionSchema],
    },
    { toJSON: { virtuals: true }, id: false }
);

// virtuals
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions ? this.reactions.length : 0;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
