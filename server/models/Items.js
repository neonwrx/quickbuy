const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  partner: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  price2: {
    type: Number,
    default: 0
  },
  price3: {
    type: Number,
    default: 0
  },
  price4: {
    type: Number,
    default: 0
  },
  descr: {
    type: String,
    default: ''
  },
  descr2: {
    type: String,
    default: ''
  },
  images: [
    {
      src: {
        type: String,
        default: ''
      }
    }
  ],
  category: {
    type: String,
    default: ''
  },
  sale: {
    type: Boolean,
    default: false
  },
  productId: {
    type: String,
    default: ''
  },
  added: {
    type: Date,
    default: Date.now()
  },
  bought: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Items', ItemSchema);
