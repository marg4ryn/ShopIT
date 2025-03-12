const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },  
  stock: {
    type: Number,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  imageUrl: String,
});

const Product = mongoose.model('Product', productSchema);
