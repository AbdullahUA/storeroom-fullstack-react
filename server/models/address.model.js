import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address_line: {
      type: String,
      required: [true, "Please add your address line 1"],
      default: "",
    },
    city: {
      type: String,
      required: [true, "Please add your city"],
      default: "",
    },
    state: {
      type: String,
      required: [true, "Please add your state"],
      default: "",
    },
    pincode: {
      type: Number,
      required: [true, "Please add your pincode"],
      default: null,
    },
    country: {
      type: String,
      required: [true, "Please add your country"],
      default: null,
    },
    mobile: {
      type: Number,
      required: [true, "Please add your mobile number"],
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model("Address", addressSchema);
export default AddressModel;
