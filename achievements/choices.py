class ACHIEVEMENT_CHOICES:
    SUM_MEASUREMENTS_COMPLETED = "SUM_MEASUREMENTS_COMPLETED"
    SUM_EXERCISE_CREATED = "SUM_EXERCISE_CREATED"
    SUM_TRAININGS_CREATED = "SUM_TRAININGS_CREATED"
    SUM_TRAININGS_COMPLETED = "SUM_TRAININGS_COMPLETED"
    SUM_LOGGED_TIME = "SUM_LOGGED_TIME"
    LOGGED_TIME = "LOGGED_TIME"
    SUM_USER_MODIFY_TRAINING = "SUM_USER_MODIFY_TRAINING"


LANGUAGES = (
    ("en", "English"),
    ("pl", "Polski"),
    ("de", "Deutsch"),
)

ACHIEVEMENTS_MESSAGES = {
    "SUM_TRAININGS_CREATED": {
        1: "Congratulations! You have just created your first training.",
        5: "Congratulations! You have just created your fifth training."
    },
    "SUM_EXERCISE_CREATED": {
        1: "Congratulations! You have added your first exercise.",
        5: "Congratulations! You have added your fifth exercise."
    },
    "SUM_USER_MODIFY_TRAINING": {
        1: "Congratulations! You have successfully modified your first workout.",
        10: "Congratulations! You have successfully modified 10 workouts.",
        100: "Congratulations! You have successfully modified 100 workouts."
    },
    "SUM_USER_GOALS_ADDED": {
        1: "Congratulations! You have successfully completed your first goal.",
    },
    "SUM_MEASUREMENTS_ADDED": {
        1: "Congratulations! You have successfully added your first measurement.",
    }

}
