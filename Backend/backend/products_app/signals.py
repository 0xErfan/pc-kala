import os
import urllib.request
from django.conf import settings
from .models import ProductImage
from django.core.files import File
from django.dispatch import receiver
from django.db.models.signals import post_save

@receiver(post_save, sender=ProductImage)
def product_image_post_save(sender, instance, **kwargs):
    if instance.image_url:
        # Get the filename from the image URL
        filename = os.path.basename(instance.image_url)
        
        # Check if the file exists in the media directory
        if not os.path.exists(os.path.join(settings.MEDIA_ROOT, 'images/products/', filename)):
            # Download the image from the URL
            result = urllib.request.urlretrieve(instance.image_url)
            # Open the downloaded file
            with open(result[0], 'rb') as f:
                # Set the downloaded image as the image field
                instance.image.save(
                    filename,
                    File(f),
                    save=False,
                )
        else:
            # Image already exists in the media directory
            print("Image already exists in the media directory.")
