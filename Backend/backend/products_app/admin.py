from django.contrib import admin

from .models import (
    MainCategory,
    Category,
    ProductImage,
    Product,
    MotherBoard,
    CPU,
    Ram,
    HardDisk,
    SSD,
    GraphicCard,
    Power,
    Cooler,
    Case,
    PC,
    Laptop,
)
admin.site.register(MainCategory)
admin.site.register(Product)
admin.site.register(ProductImage)
admin.site.register(PC)
admin.site.register(CPU)
admin.site.register(GraphicCard)
admin.site.register(MotherBoard)
admin.site.register(Ram)
admin.site.register(SSD)
admin.site.register(HardDisk)
admin.site.register(Power)
admin.site.register(Cooler)
admin.site.register(Case)
admin.site.register(Category)
admin.site.register(Laptop)
