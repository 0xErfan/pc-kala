
# Guide For Running Django Server

<p> 1- Create a virtual enviroment </p>

> python -m venv venv

<p> 2- Activate your Virtual enviroment </p>

> source venv/bin/activate 

<p> 3- Install packages </p>

> pip install -r requirements.txt

<p> 4- Go a head to the manage.py file directory </br> 
</p>

> python manage.py migrate

> python manage.py makemigrations products_app

> python manage.py migrate

<p> 5- Load data into your database </p>

> python manage.py loaddata products.json

<p> 6- Create Superuser for accessing admin panel </p>

> python manage.py createsuperuser

<p> 7- Run django server </p>

> python manage.py runserver



