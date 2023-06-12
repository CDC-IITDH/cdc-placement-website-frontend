# Staff Roles and Responsibilities

## Create a new staff member

- Run `python manage.py createsuperuser` in the terminal in cdc-placement-website-backend folder after activating the virtual environment.
- Enter the required details.
<img src="./wflow_images/Screenshot%20(143).png" height=60% width=60%>

## Login to django admin as staff member
- Go to `http://127.0.0.1:8000/admin` and login with the credentials of the staff member.
- Now you can see the users at `http://127.0.0.1:8000/admin/auth/user/`
<img src="./wflow_images/Screenshot%20(144).png" height=60% width=60%>

## Assigning Permissions to the new staff members
- By default the newly registered staff member has all permissions active and you can remove some permissions if not necessary
<img src="./wflow_images/Screenshot%20(145).png" height=60% width=60%>


## Models and Objects
- We have 5 models in the backend
    - User
    - Students
    - Pre placement offers
    - Placements
    - Placement applications
- Each model have their own objects

<img src="./wflow_images/Screenshot%20(146).png" height=60% width=60%>



## Import and Export of Objects in a model

- We can import and export objects in a model through excel/json files

<img src="./wflow_images/Screenshot%20(148).png" height=60% width=60%>

<img src="./wflow_images/Screenshot%20(149).png" height=60% width=60%>


## History of an object
- We can see the history of an object by clicking the history button for the corresponding object

<img src="./wflow_images/Screenshot%20(150).png" height=60% width=60%>

## Editing an object

- After changing the details of an object click the save button to save the changes

<img src="./wflow_images/Screenshot%20(151).png" height=60% width=60%>