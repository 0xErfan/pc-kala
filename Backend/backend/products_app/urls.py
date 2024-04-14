from django.urls import path
from . import views
urlpatterns = [
    path('products/all/', views.ProductListView.as_view(), name='products_list'),
    path('products/<int:pk>/', views.ProductDetailView.as_view(), name='products_detail'),
]
