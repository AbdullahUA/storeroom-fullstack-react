import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";

export const CashOnDeliveryOrderController = (req, res) => {
  try {
    const userId = req.userId;
    const { list_items, totalAmt, addressId, subTotalAmt } = req.body;
    // userId: orderId: "ORD-";
    // address:
    // productId:
    // product_details: {
    //   name: "";
    //   image: [];
    // }
    // name:
    // payment_Id: payment_status: delivery_address: subTotalAmt: totalAmt: invoice_receipt:
    return res.json({
      message: "Payment Successful",
      error: false,
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
