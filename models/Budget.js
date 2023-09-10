const {Schema, model} = require('mongoose');

const Budget = new Schema ({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  // Другие поля бюджета
});

module.exports = model('Budget', Budget);