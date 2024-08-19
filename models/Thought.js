const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
  },
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a'),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
