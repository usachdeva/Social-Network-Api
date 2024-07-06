const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, requied: true, maxlength: 280 },
    username: { type: String, requied: true },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
});

module.exports = reactionSchema;
