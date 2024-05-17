const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    status: { type: String, enum: ['processing', 'received', 'canceled'] }
});

const BasketItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
});

const NotificationSchema = new mongoose.Schema({
    body: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seen: { type: Boolean, default: false }
});

const WishModel = mongoose.models.Wish || mongoose.model('Wish', WishSchema);
const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
const BasketItemModel = mongoose.models.BasketItem || mongoose.model('BasketItem', BasketItemSchema);
const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);