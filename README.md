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

Backend of application is written in django framework. Application contain Login and Registration for user and requires the user to be logged in to use the application. Frontend of aplication is written in react, for easier management of application status was used redux. Forms are validated via Formik library and validated by yup to prevent errors. Application utilizes Docker containers for seamless deployment and execution. Staticfiles are served via nginx. The application is hosted on my vps server and with each approved PR it is built and reloaded automatically thanks to github actions.



