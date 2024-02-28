# True Effects - Application that allows you to manage your training. 


## Technology stack

### DevOps
- Nginx
- Docker
### Backend 
- Django
### Frontend:
- React
- Redux
- Formik (to handle forms)

## Application technology description

The backend of this application is written in django framework. The application contains Login and Registration for user and requires the user to be logged in to use the application. Frontend of aplication is written in react, for easier management of the application status, redux was used. Forms are validated via Formik library and every input is validated by yup to prevent errors. Application utilizes Docker containers for seamless deployment and execution, while staticfiles are served via nginx. The application is hosted on my vps server and with each approved PR it is built and reloaded automatically, thanks to github actions.


## Application allows to:

- Login user
- Register user
- Create own training(Customized to your needs)
- Display trainings in Calendar(where user can access every single training and decide if he want to modify or train).
- Create exercises(User has access to already created exercises but can also create their own with two clicks and use them in training)
- Create Goals(Goal include completion date, name, description, and allow user to determine if it has already been completed or not)
- Create Dimensions(Creating dimensions is pretty east app allows to compare two dimensions)
- Modify Settings (User can modify what app display f.e user can decide which fields in dimensions will be showed or do some basic commands like password change)
- Modify Training (User can modify every single series and fit for user needs)
- Create Training (Just like Modify Training user can create training depends on needs. There is option to create manually single series or with single click create as many series as user wants. Every Series contains many informations like time of rest number of reps or phases)
- Train - MOST IMPORTANT FEATURE!!! (After each workout, the workout data is saved so that the user can preview his or her results in the calendar.)
- And much more :)


