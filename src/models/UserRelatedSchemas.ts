const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

const OrderSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    status: { type: String, enum: ['processing', 'canceled', 'delivered'], required: true }
});

const BasketItemSchema = new mongoose.Schema({
    userBasketID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

const NotificationSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    seen: { type: Boolean, default: false }
});

const WishModel = mongoose.models.Wish || mongoose.model('Wish', WishSchema);
const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
const BasketItemModel = mongoose.models.BasketItem || mongoose.model('BasketItem', BasketItemSchema);
const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export { WishModel, OrderModel, BasketItemModel, NotificationModel }