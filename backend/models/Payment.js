const paymentSchema = new mongoose.Schema({
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    amount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Payment = mongoose.model('Payment', paymentSchema);
  