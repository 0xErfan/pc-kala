from django.urls import path
from . import views
urlpatterns = [
    path('products/all/', views.ProductListView.as_view(), name='products_list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='products_detail'),
    path('products/motherboard/all/', views.MotherBoardListView.as_view(), name='motherboard_list'),
    path('products/cpu/all/', views.CPUListView.as_view(), name='cpu_list'),
    path('products/ram/all/', views.RamListView.as_view(), name='ram_list'),
    path('products/hard-disk/all/', views.HardDiskListView.as_view(), name='hard_disk_list'),
    path('products/ssd/all/', views.SSDListView.as_view(), name='ssd_list'),
    path('products/gpu/all/', views.GraphicCardListView.as_view(), name='gpu_list'),
    path('products/power/all/', views.PowerListView.as_view(), name='power_list'),
    path('products/cooler/all/', views.CoolerListView.as_view(), name='cooler_list'),
    path('products/case/all/', views.CaseListView.as_view(), name='case_list'),
    path('products/pc/all/', views.PCListView.as_view(), name='pc_list'),
    path('products/laptop/all/', views.LaptopListView.as_view(), name='laptop_list'),
]
