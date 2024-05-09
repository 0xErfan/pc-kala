import mongoose, { Schema } from "mongoose"

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

const PartsSchema = new mongoose.Schema({

    ...baseProductModel.obj,

    category: { type: String, default: 'parts', immutable: true },

    specs: Schema.Types.Mixed
})

const AccessoriesSchema = new mongoose.Schema({

    ...baseProductModel.obj,

    category: { type: String, default: 'accessory', immutable: true },

    specs: Schema.Types.Mixed
})

const ConsoleSchema = new mongoose.Schema({

    ...baseProductModel.obj,

    category: { type: String, default: 'console', immutable: true },

    specs: {
        gpu: {
            title: { type: String, default: "پردازنده گرافیکی کنسول", immutable: true },
            value: { type: String }
        },
        ram: {
            title: { type: String, default: "حافظه‌ی رم کنسول", immutable: true },
            value: { type: String }
        },
        storage: {
            title: { type: String, default: "حافظه‌ی ذخیره‌سازی کنسول", immutable: true },
            value: { type: String }
        },
        cpupower: {
            title: { type: String, default: "توان پردازشی کنسول", immutable: true },
            value: { type: String }
        },
        color: {
            title: { type: String, default: "رنگ کنسول", immutable: true },
            value: { type: String }
        },
    }

})


//  Models

const LaptopModel = mongoose.models.Laptop || mongoose.model('Laptop', LaptopSchema)

const PcModel = mongoose.models.PC || mongoose.model('PC', PcSchema)

const PartsModel = mongoose.models.Part || mongoose.model('Part', PartsSchema)

const AccessoriesModel = mongoose.models.Accessory || mongoose.model('Accessory', AccessoriesSchema)

const ConsoleModels = mongoose.models.Console || mongoose.model('Console', ConsoleSchema)





// Export

export { LaptopModel, PcModel, PartsModel, AccessoriesModel, ConsoleModels }