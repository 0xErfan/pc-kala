from rest_framework.generics import ListAPIView, RetrieveAPIView
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

from . import serializers


class ProductListView(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    


class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer
    

class MotherBoardListView(ListAPIView):
    queryset = MotherBoard.objects.all()
    serializer_class = serializers.MotherBoardSerializer



class CPUListView(ListAPIView):
    queryset = CPU.objects.all()
    serializer_class = serializers.CPUserializer



class RamListView(ListAPIView):
    queryset = Ram.objects.all()
    serializer_class = serializers.RamSerializer



class HardDiskListView(ListAPIView):
    queryset = HardDisk.objects.all()
    serializer_class = serializers.HardDiskSerializer


class SSDListView(ListAPIView):
    queryset = SSD.objects.all()
    serializer_class = serializers.SSDSerializer


class GraphicCardListView(ListAPIView):
    queryset = GraphicCard.objects.all()
    serializer_class = serializers.GraphicCardSerializer




class PowerListView(ListAPIView):
    queryset = Power.objects.all()
    serializer_class = serializers.PowerSerializer



class CoolerListView(ListAPIView):
    queryset = Cooler.objects.all()
    serializer_class = serializers.CoolerSerializer



class CaseListView(ListAPIView):
    queryset = Case.objects.all()
    serializer_class = serializers.CaseSerializer




class PCListView(ListAPIView):
    queryset = PC.objects.all()
    serializer_class = serializers.PCSerializer
    
class LaptopListView(ListAPIView):
    queryset = Laptop.objects.all()
    serializer_class = serializers.LaptopSerializer