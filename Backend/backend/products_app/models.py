from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='images/products/')

    def __str__(self):
        return self.product.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.PositiveIntegerField()
    quantity_available = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class MotherBoard(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    appearance = models.CharField(max_length=255)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=255)
    platform = models.CharField(max_length=255)
    cpu_socket = models.CharField(max_length=255)
    chipset = models.CharField(max_length=255)
    max_supported_memory = models.PositiveIntegerField()
    memory_slots_num = models.PositiveIntegerField()
    compatibility = models.CharField(max_length=100)
    num_ports = models.PositiveIntegerField()

    def __str__(self):
        return self.product.name


class CPU(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    BRAND = (
        ('AMD', 'AMD'),
        ('Intel', 'Intel'),
    )
    brand = models.CharField(max_length=100, choices=BRAND, default='Intel')
    model = models.CharField(max_length=255)
    cores = models.PositiveBigIntegerField()
    threads = models.PositiveIntegerField()
    chache_storage = models.PositiveIntegerField()
    cpu_socket = models.CharField(max_length=255)
    consumptionـpower = models.PositiveIntegerField(max_length=255)
    PACKING = (
        ('Tray', 'Tray'),
        ('Box', 'Box'),
    )
    packing = models.CharField(max_length=255, choices=PACKING, default='Tray')

    def __str__(self):
        return self.product.name


class Ram(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    RAM_TYPE = (
        ('DDR5', 'DDR5'),
        ('DDR4', 'DDR4'),
        ('DDR3', 'DDR3')
    )
    ram_type = models.CharField(
        max_length=100, choices=RAM_TYPE, default='DDR4')
    ram_frequency = models.PositiveIntegerField

    def __str__(self):
        return self.product.name


class HardDisk(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=255)
    appearance = models.FloatField()
    reading_speed = models.PositiveIntegerField()
    writing_speed = models.PositiveIntegerField()
    connection_type = models.CharField(max_length=255)
    num_revolutions_minute = models.PositiveIntegerField()
    storage = models.PositiveIntegerField

    def __str__(self):
        return self.product.name


class SSD(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=255)
    appearance = models.FloatField()
    reading_speed = models.PositiveIntegerField()
    writing_speed = models.PositiveIntegerField()
    connection_type = models.CharField(max_length=255)
    storage = models.PositiveIntegerField()

    def __str__(self):
        return self.product.name


class GraphicCard(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100)
    creator = models.CharField(max_length=255)
    amount_memory = models.PositiveIntegerField()
    chip = models.CharField(max_length=255)
    connection_interface = models.CharField(max_length=255)
    cooler = models.CharField(max_length=255)
    image_output_port_type = models.CharField(max_length=255)
    STORAGE_TYPE = (
        ('DDR5', 'DDR5'),
        ('DDR4', 'DDR4'),
        ('DDR3', 'DDR3')
    )
    storage_type = models.CharField(max_length=255, choices=STORAGE_TYPE)
    num_image_output_ports = models.PositiveIntegerField()

    def __str__(self):
        return self.product.name


class Power(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100)
    output_power = models.PositiveIntegerField()
    cable_output_type = models.CharField(max_length=255)
    num_44_motherboard_pins = models.PositiveIntegerField()
    num_62_graphic_pins = models.PositiveIntegerField()
    cpu_output_pin = models.CharField(max_length=255)
    gpu_output_pin = models.CharField(max_length=255)
    sata_num_output = models.PositiveIntegerField()
    cooling_fan_size = models.PositiveIntegerField()
    useful_life = models.CharField(max_length=255)

    def __str__(self):
        return self.product.name


class Cooler(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=255)
    cooler_type = models.CharField(max_length=255)
    dimensions = models.CharField(max_length=255)
    speed = models.PositiveIntegerField()
    lighting = models.CharField(max_length=255)
    num_fan = models.PositiveIntegerField()

    def __str__(self):
        return self.product.name


class Case(models.Model):
    product = models.OneToOneField(
        Product, on_delete=models.CASCADE, primary_key=True)
    brand = models.CharField(max_length=100)
    body_material = models.CharField(max_length=255)
    side_material = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    max_cooler_heoght = models.PositiveIntegerField()
    skeleton_type = models.CharField(max_length=255)
    num_installed_fans = models.PositiveIntegerField()
    dimensions = models.CharField(max_length=255)
    max_installation_space_graphics_card = models.PositiveIntegerField()

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
    pc_type = models.CharField(max_length=255, choices=PC_TYPE, default="Gaming")
    processor = models.ForeignKey(CPU, on_delete=models.CASCADE)
    mother_board = models.ForeignKey(MotherBoard, on_delete=models.CASCADE)
    graphics_card = models.ForeignKey(GraphicCard, on_delete=models.CASCADE)
    ram = models.ForeignKey(Ram, on_delete=models.CASCADE)
    hdd = models.ForeignKey(HardDisk, on_delete=models.CASCADE)
    ssd = models.ForeignKey(SSD, on_delete=models.CASCADE)
    power = models.ForeignKey(Power, on_delete=models.CASCADE)
    cooler = models.ForeignKey(Cooler, on_delete=models.CASCADE)
    case = models.ForeignKey(Case, on_delete=models.CASCADE)
    operating_system = models.CharField(max_length=100, default='Windows')
    

    def __str__(self):
        return self.product.name
