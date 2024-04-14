from django.apps import AppConfig


class ProductsAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'products_app'
    
    def ready(self) -> None:
        import products_app.signals