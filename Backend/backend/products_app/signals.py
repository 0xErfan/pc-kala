from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ProductImage
import urllib.request
import os
from django.core.files import File

@receiver(post_save, sender=ProductImage)
def product_image_post_save(sender, instance, **kwargs):
    if instance.image_url and not instance.image:
        # Download the image from the URL
        result = urllib.request.urlretrieve(instance.image_url)
        print(result)
        # Open the downloaded file
        with open(result[0], 'rb') as f:
            # Set the downloaded image as the image field
            instance.image.save(
                os.path.basename(instance.image_url),
                File(f),
                save=False,
            )
