from django.db import models
import urllib.request
import os


class Category(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return self.name
    
# class MainCategory(models.Model):
#     name = models.CharField(max_length=50, null=True, blank=True)

#     def __str__(self):
#         return self.name


class Product(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.PositiveIntegerField(null=True, blank=True)
    quantity_available = models.IntegerField(null=True, blank=True)
    # main_category = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

from django.core.files import File

class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name='images',on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(
        upload_to='images/products/', null=True, blank=True)
    # New field for storing the image URL
    image_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.product.name

    def save(self, *args, **kwargs):
        # If image URL is provided and image field is not filled
        if self.image_url and not self.image:
            # Download the image from the URL
            result = urllib.request.urlretrieve(self.image_url)
            print(result)
            # Open the downloaded file
            with open(result[0], 'rb') as f:
                # Set the downloaded image as the image field
                self.image.save(
                    os.path.basename(self.image_url),
                    File(f),
                    save=False,
                )
        super().save(*args, **kwargs)


class MotherBoard(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    appearance = models.CharField(max_length=255, null=True, blank=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    platform = models.CharField(max_length=255, null=True, blank=True)
    cpu_socket = models.CharField(max_length=255, null=True, blank=True)
    chipset = models.CharField(max_length=255, null=True, blank=True)
    max_supported_memory = models.PositiveIntegerField(null=True, blank=True)
    memory_slots_num = models.PositiveIntegerField(null=True, blank=True)
    compatibility = models.CharField(max_length=100, null=True, blank=True)
    num_ports = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.product.name


class CPU(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    BRAND = (
        ('AMD', 'AMD'),
        ('Intel', 'Intel'),
    )
    brand = models.CharField(
        max_length=100, choices=BRAND, default='Intel', null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    cores = models.PositiveBigIntegerField(null=True, blank=True)
    threads = models.PositiveIntegerField(null=True, blank=True)
    chache_storage = models.PositiveIntegerField(null=True, blank=True)
    cpu_socket = models.CharField(max_length=255, null=True, blank=True)
    consumptionـpower = models.PositiveIntegerField(null=True, blank=True)
    PACKING = (
        ('Tray', 'Tray'),
        ('Box', 'Box'),
    )
    packing = models.CharField(
        max_length=255, choices=PACKING, default='Tray', null=True, blank=True)

    def __str__(self):
        return self.product.name


class Ram(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=255, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    RAM_TYPE = (
        ('DDR5', 'DDR5'),
        ('DDR4', 'DDR4'),
        ('DDR3', 'DDR3')
    )
    ram_type = models.CharField(
        max_length=100, choices=RAM_TYPE, default='DDR4', null=True, blank=True)
    ram_frequency = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.product.name


class HardDisk(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    appearance = models.FloatField(null=True, blank=True)
    reading_speed = models.PositiveIntegerField(null=True, blank=True)
    writing_speed = models.PositiveIntegerField(null=True, blank=True)
    connection_type = models.CharField(max_length=255, null=True, blank=True)
    num_revolutions_minute = models.PositiveIntegerField(null=True, blank=True)
    storage = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.product.name


class SSD(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100, null=True, blank=True)

    appearance = models.CharField(max_length=255,null=True, blank=True)
    reading_speed = models.PositiveIntegerField(null=True, blank=True)
    writing_speed = models.PositiveIntegerField(null=True, blank=True)
    connection_type = models.CharField(max_length=255, null=True, blank=True)
    storage = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.product.name


class GraphicCard(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    creator = models.CharField(max_length=255, null=True, blank=True)
    amount_memory = models.PositiveIntegerField(null=True, blank=True)
    chip = models.CharField(max_length=255, null=True, blank=True)
    connection_interface = models.CharField(
        max_length=255, null=True, blank=True)
    cooler = models.CharField(max_length=255, null=True, blank=True)
    image_output_port_type = models.CharField(
        max_length=255, null=True, blank=True)

    storage_type = models.CharField(
        max_length=255, null=True, blank=True)
    num_image_output_ports = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.product.name


class Power(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    output_power = models.PositiveIntegerField(null=True, blank=True)
    cable_output_type = models.CharField(max_length=255, null=True, blank=True)
    num_44_motherboard_pins = models.PositiveIntegerField(
        null=True, blank=True)
    num_62_graphic_pins = models.PositiveIntegerField(null=True, blank=True)
    cpu_output_pin = models.CharField(max_length=255, null=True, blank=True)
    gpu_output_pin = models.CharField(max_length=255, null=True, blank=True)
    sata_num_output = models.PositiveIntegerField(null=True, blank=True)
    cooling_fan_size = models.PositiveIntegerField(null=True, blank=True)
    useful_life = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.product.name


class Cooler(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    model = models.CharField(max_length=255, null=True, blank=True)
    cooler_type = models.CharField(max_length=255, null=True, blank=True)
    dimensions = models.CharField(max_length=255, null=True, blank=True)
    speed = models.PositiveIntegerField(null=True, blank=True)
    lighting = models.CharField(max_length=255, null=True, blank=True)
    num_fan = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.product.name


class Case(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100, null=True, blank=True)
    body_material = models.CharField(max_length=255, null=True, blank=True)
    side_material = models.CharField(max_length=255, null=True, blank=True)
    color = models.CharField(max_length=255, null=True, blank=True)
    max_cooler_heoght = models.PositiveIntegerField(null=True, blank=True)
    skeleton_type = models.CharField(max_length=255, null=True, blank=True)
    num_installed_fans = models.PositiveIntegerField(null=True, blank=True)
    dimensions = models.CharField(max_length=255, null=True, blank=True)
    max_installation_space_graphics_card = models.PositiveIntegerField(
        null=True, blank=True)

    def __str__(self):
        return self.product.name


class PC(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    PC_TYPE = (
        ('Gaming', 'Gaming'),
        ('Rendering', 'Rendering'),
        ('Trading', 'Trading'),
        ('Accounting', 'Accounting'),
        ('Student', 'Student'),
        ('Official', 'Official'),
        ('Economic', 'Economic'),
        ('Stock', 'Stock'),
    )
    pc_type = models.CharField(
        max_length=255, choices=PC_TYPE, default="Gaming", null=True, blank=True)
    processor = models.ForeignKey(
        CPU, on_delete=models.CASCADE, null=True, blank=True)
    mother_board = models.ForeignKey(
        MotherBoard, on_delete=models.CASCADE, null=True, blank=True)
    graphics_card = models.ForeignKey(
        GraphicCard, on_delete=models.CASCADE, null=True, blank=True)
    ram = models.ForeignKey(
        Ram, on_delete=models.CASCADE, null=True, blank=True)
    hdd = models.ForeignKey(
        HardDisk, on_delete=models.CASCADE, null=True, blank=True)
    ssd = models.ForeignKey(
        SSD, on_delete=models.CASCADE, null=True, blank=True)
    power = models.ForeignKey(
        Power, on_delete=models.CASCADE, null=True, blank=True)
    cooler = models.ForeignKey(
        Cooler, on_delete=models.CASCADE, null=True, blank=True)
    case = models.ForeignKey(
        Case, on_delete=models.CASCADE, null=True, blank=True)
    operating_system = models.CharField(
        max_length=100, default='Windows', null=True, blank=True)

    def __str__(self):
        return self.product.name
