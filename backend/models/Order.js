const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },

  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },

  delivery: {
    street: {
      type: String,
      required: true
    },
    house: {
      type: String,
      required: true
    },
    apartment: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    postcode: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true,
      enum: ['inpost', 'dhl', 'dpd']
    }
  },

  paymentMethod: {
    type: String,
    required: true,
    enum: ['payu', 'tpay', 'google_pay', 'paypo', 'blik', 'traditional_transfer', 
      'online_payment_card', 'card_upon_receipt', 'cash_on_delivery'
    ]
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Order', orderSchema);
