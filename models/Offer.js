import mongoose from "mongoose";

const { Schema } = mongoose;

const offerSchema = new Schema({
  name: String,
  description: String,
  price: Number
});

// Export safely to avoid OverwriteModelError
export default mongoose.models.offers || mongoose.model("offers", offerSchema);