import { Schema, model, Document, models } from 'mongoose';

interface Product extends Document {
    name: string;
    price: number;
    discount: number
    image: string;
    type: 'pc' | 'laptop' | 'parts' | 'accessory' | 'console';
    specs: any
}

const ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String, default: ''},
    type: {
        type: String,
        enum: ['pc', 'laptop', 'parts', 'accessory', 'console'],
        required: true,
    },
    specs: { type: Schema.Types.Mixed },
});

const ProductModel = models.Product || model<Product>('Product', ProductSchema);

export default ProductModel;