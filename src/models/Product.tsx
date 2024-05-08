import mongoose from "mongoose"

//    Schemas

const baseProductModel = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
    image: String
})

const PcSchema = new mongoose.Schema({

    ...baseProductModel.obj,

    category: { type: String, default: 'pc', immutable: true },

    specs: {
        motherboard: {
            title: { type: String, default: 'مخشصات مادربرد', immutable: true },
            value: { type: String, required: true }
        },
        powerSupply: {
            title: { type: String, default: "منبع تغذیه", immutable: true },
            value: { type: String }
        },
        ram: {
            title: { type: String, default: "رم", immutable: true },
            value: { type: String, required: true }
        },
        gpu: {
            title: { type: String, default: "کارت گرافیک", immutable: true },
            value: { type: String }
        },
        case: {
            title: { type: String, default: "مشخصات کیس", immutable: true },
            value: { type: String }
        },
        ssd: {
            title: { type: String, default: "حافظه SSD", immutable: true },
            value: { type: String }
        },
        cpu: {
            title: { type: String, default: "پردازنده", immutable: true },
            value: { type: String }
        },
    }

})

const LaptopSchema = new mongoose.Schema({

    ...baseProductModel.obj,

    category: { type: String, default: 'laptop', immutable: true },
    brand: { type: String, required: true },

    specs: {
        ram: {
            title: { type: String, default: "رم", immutable: true },
            value: { type: String, required: true }
        },
        gpu: {
            title: { type: String, default: "کارت گرافیک", immutable: true },
            value: { type: String }
        },
        case: {
            title: { type: String, default: "مشخصات کیس", immutable: true },
            value: { type: String }
        },
        ssd: {
            title: { type: String, default: "حافظه SSD", immutable: true },
            value: { type: String }
        },
        cpu: {
            title: { type: String, default: "پردازنده", immutable: true },
            value: { type: String }
        },
        screen: {
            title: { type: String, default: "صفحه نمایش", immutable: true },
            value: { type: String }
        },
        color: {
            title: { type: String, default: "رنگ", immutable: true },
            value: { type: String }
        },
    }
})

const PartsSchema = new mongoose.Schema({ ...baseProductModel.obj })

const AccessoriesSchema = new mongoose.Schema({ ...baseProductModel.obj })



//  Models

const LaptopModel = mongoose.models.Laptop || mongoose.model('Laptop', LaptopSchema)

const PcModel = mongoose.models.PC || mongoose.model('PC', PcSchema)

const PartsModel = mongoose.models.Part || mongoose.model('Part', PartsSchema)

const AccessoriesModel = mongoose.models.Accessoriy || mongoose.model('Accessory', AccessoriesSchema)





// Export 

export { LaptopModel, PcModel, PartsModel, AccessoriesModel }