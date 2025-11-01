const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
 productId:{type: String, unique: true},
  name: { type: String, required: true },
  department: { type: String, required: true },
  serviceType: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  duration: { type: String },
  rating: { type: Number, default: 0 },
  provider: { type: String, required: true },
  creator: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  agent:{ type: Boolean, default: false },
}, { timestamps: true });
serviceSchema.pre("save", function (next) {
  if (!this.productId) {
    this.productId = new mongoose.Types.ObjectId().toString();
  }
  next();
});
module.exports = mongoose.model('Service', serviceSchema);