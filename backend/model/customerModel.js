import mongoose, { mongo } from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },

  //
  aadhar: { type: String, required: true },
  pan: { type: String, required: true },
  branchname: { type: String, required: true },
  branchcode: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }

});

export default mongoose.model("Customer", CustomerSchema);
