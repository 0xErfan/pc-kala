import { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: [String] },
    category: { type: String, enum: ['pc', 'laptop', 'parts', 'accessory', 'console'], required: true },
    ['sub-cat']: { type: String, default: null },
    specs: { type: Schema.Types.Mixed },
    customers: { type: Number, default: 0 }
}, { timestamps: true });

const ProductModel = models.Product || model('Product', ProductSchema);

export default ProductModel;