const mongoose = require('mongoose');

const WishSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const BasketItemSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const WishModel = mongoose.models.Wish || mongoose.model('Wish', WishSchema);
const CommentModel = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
const OrderModel = mongoose.models.Order || mongoose.model('Order', OrderSchema);
const BasketItemModel = mongoose.models.BasketItem || mongoose.model('BasketItem', BasketItemSchema);
const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);