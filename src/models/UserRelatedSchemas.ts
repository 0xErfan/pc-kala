const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

const OrderItemSchema = new mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    count: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: { type: [OrderItemSchema], required: true },
    status: { type: String, enum: ["PROCESSING", "DELIVERED", "CANCELED"], default: "PROCESSING" }
}, { timestamps: true });

const BasketItemSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    count: { type: Number, default: 1, min: 1 },
    services: { type: mongoose.Schema.Types.Mixed, default: [] }
});

const NotificationSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
}, { timestamps: true });

const WishModel = mongoose.models.Wish || mongoose.model('Wish', WishSchema);
const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
const BasketItemModel = mongoose.models.BasketItem || mongoose.model('BasketItem', BasketItemSchema);
const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export { WishModel, OrderModel, BasketItemModel, NotificationModel }