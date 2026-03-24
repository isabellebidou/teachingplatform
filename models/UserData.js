import mongoose from "mongoose";

const { Schema } = mongoose;

const userDataSchema = new Schema({
  fname: String,
  lname: String,
  dob: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

// Export safely to avoid OverwriteModelError
export default mongoose.models.userdata || mongoose.model("userdata", userDataSchema);

