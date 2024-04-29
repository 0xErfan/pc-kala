from rest_framework import serializers
from .models import (
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
    Laptop
)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(read_only=True, many=True)
    category = serializers.CharField(source='category.name')

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'category', 'images']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # print(instance)

        # Assuming category is a ForeignKey to a Category model
        category = instance.category.name
        if category == 'حافظه رم':
            sub = Ram.objects.get(pk=instance)
            representation['ram'] = RamSerializer(sub).data
        if category == 'گرافیک':
            sub = GraphicCard.objects.get(pk=instance)
            representation['GraphicCard'] = GraphicCardSerializer(sub).data

        if category == 'مادربرد':
            sub = MotherBoard.objects.get(pk=instance)
            representation['motherboard'] = MotherBoardSerializer(sub).data
        if category == 'هارد دیسک':
            sub = HardDisk.objects.get(pk=instance)
            representation['HardDisk'] = HardDiskSerializer(sub).data

        if category == 'حافظه SSD':
            print(instance)
            sub = SSD.objects.get(pk=instance)

            representation['ssd'] = SSDSerializer(sub).data

        if category == 'کیس کامپیوتر':
            sub = Case.objects.get(pk=instance)
            representation['case'] = CaseSerializer(sub).data
            # representation.pop('ram', None)
        if category == 'پردازنده مرکزی':
            sub = CPU.objects.get(pk=instance)
            representation['CPU'] = CPUserializer(sub).data

        if category == 'منبع تغذیه':
            sub = Power.objects.get(pk=instance)
            representation['power'] = PowerSerializer(sub).data
        if category == 'خنک کننده':
            sub = Cooler.objects.get(pk=instance)
            representation['Cooler'] = CoolerSerializer(sub).data
        if category == 'PC':
            sub = PC.objects.get(pk=instance)
            representation['PC'] = PCSerializer(sub).data
        return representation


class MotherBoardSerializer(serializers.ModelSerializer):

    class Meta:
        model = MotherBoard
        fields = '__all__'


class RamSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ram
        fields = '__all__'


class SSDSerializer(serializers.ModelSerializer):

    class Meta:
        model = SSD
        fields = '__all__'


class HardDiskSerializer(serializers.ModelSerializer):

    class Meta:
        model = HardDisk
        fields = '__all__'


class PowerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Power
        fields = '__all__'


class CoolerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cooler
        fields = '__all__'


class CaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Case
        fields = '__all__'


class CPUserializer(serializers.ModelSerializer):

    class Meta:
        model = CPU
        fields = '__all__'


class GraphicCardSerializer(serializers.ModelSerializer):

    class Meta:
        model = GraphicCard
        fields = '__all__'


class PCSerializer(serializers.ModelSerializer):

    mother_board = MotherBoardSerializer()
    ram = RamSerializer()
    ssd = SSDSerializer()
    hdd = HardDiskSerializer()
    power = PowerSerializer()
    cooler = CoolerSerializer()
    case = CaseSerializer()
    processor = CPUserializer()
    graphics_card = GraphicCardSerializer()

    class Meta:
        model = PC
        fields = '__all__'


class LaptopSerializer(serializers.ModelSerializer):

    class Meta:
        model = Laptop
        fields = '__all__'
