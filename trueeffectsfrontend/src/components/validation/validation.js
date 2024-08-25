const yup = require("yup");

export const createGoalValidation = yup.object().shape({
    finishDate: yup.string().min(8, "Provide correct date").required('Select date'),
    goal: yup.string().min(2, "Goal is too short").max(100, "Goal is too long. Use description").required('Goal' +
        ' field is required '),
    description: yup.string(),
});

export const updateGoalValidation = yup.object().shape({
    finishDate: yup.string().min(8, "Provide correct date").required('Select date'),
    goal: yup.string().min(2, "Goal is too short").max(100, "Goal is too long. Use description").required('Goal' +
        ' field is required '),
    description: yup.string(),
    completed: yup.boolean().required()
});


export const settingsDimensionValidation = yup.object().shape({
    id: yup.number().required(),
    weight: yup.boolean().required("Field weight is required"),
    growth: yup.boolean().required("Field growth is required"),
    left_biceps: yup.boolean().required("Field left biceps is required"),
    right_biceps: yup.boolean().required("Field right biceps is required"),
    left_forearm: yup.boolean().required("Field left forearm is required"),
    right_forearm: yup.boolean().required("Field right forearm is required"),
    left_leg: yup.boolean().required("Field left leg is required"),
    right_leg: yup.boolean().required("Field right leg is required"),
    bodyfat: yup.boolean().required("Field bodyfat is required"),
});

export const createDimensionValidation = yup.object().shape({
    weight: yup.number().nullable(false).required("Field weight is required"),
    growth: yup.number().nullable(true),
    left_biceps: yup.number().nullable(true),
    right_biceps: yup.number().nullable(true),
    left_forearm: yup.number().nullable(true),
    right_forearm: yup.number().nullable(true),
    left_leg: yup.number().nullable(true),
    right_leg: yup.number().nullable(true),
    bodyfat: yup.number().nullable(true),
})

export const createMultiSeriesValidation = yup.object().shape({
    exercise: yup.object().nonNullable("Select exercise").required("Select exercise"),
    extra_weight: yup.number().max(10000, "Extra weight is too big").required("Field extra" +
        " weight is required").typeError("Field extra weight must be a number"),
    rest: yup.number().integer().max(10000).required("Field rest is required").typeError("Field rest must be an" +
        " integer number"),
    reps: yup.number().required("Field reps is required").typeError("Field reps must be a number"),
    concentric_phase: yup.number().typeError("Field must be a number"),
    pause_after_concentric_phase: yup.number().typeError("Field must be a number"),
    eccentric_phase: yup.number().typeError("Field must be a number"),
    pause_after_eccentric_phase: yup.number().typeError("Field must be a number"),
    series_count: yup.number().integer().min(1, "Number is too small").max(100, "Number must be an integer 1-100"),
})

export const createSingleSeriesValidation = yup.object().shape({
    exercise: yup.object().nonNullable("Select exercise").required("Field exercise is required"),
    extra_weight: yup.number().max(10000, "Extra weight is too big").required("Field extra weight is required").typeError("Field extra weight must be a number"),
    rest: yup.number().integer().max(10000).required("Field rest is required").typeError("Field rest must be an" +
        " integer number"),
    reps: yup.number().required("Field reps is required").typeError("Field reps must be a number"),
    concentric_phase: yup.number().typeError("Field must be a number"),
    pause_after_concentric_phase: yup.number().typeError("Field must be a number"),
    eccentric_phase: yup.number().typeError("Field must be a number"),
    pause_after_eccentric_phase: yup.number().typeError("Field must be a number"),
})


export const createTrainingValidation = yup.object().shape({
    name: yup.string().min(2, "Field name is too short").max(100, "Field name is too long. Use description").required("Field name is required"),
    date: yup.string().min(2, "Field date must be selected").required("Field date must be selected"),
    description: yup.string().max(5000, "Field description is too long"),
    multi_series: yup.array().min(1, 'Field multi series needs at least number bigger than 0')

})

export const loginUserValidation = yup.object().shape({
    username: yup.string().min(4, "Field username is too short").max(100, "Field username is too long").required('Field username is required'),
    password: yup.string().min(4, "Field password is too short").max(100, "Field password is too long").required("Field password is required"),
})

export const registerUserValidation = yup.object().shape({
    username: yup.string().min(4, "Field username is too short").max(100, "Field username is too long").required('Field username is required'),
    email: yup.string().email('Field address email is invalid').required('Field address email is required'),
    password: yup.string().min(4, "Field password is too short").max(100, "Field password is too long").required("Field password is required"),
    password2: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Field repeat password is required'),
})

export const createExerciseModalValidation = yup.object().shape({
    name: yup.string().required("Field name is required"),

})

export const changePasswordValidation = yup.object().shape({
    old_password: yup.string().required('Field old password is required'),
    new_password1: yup.string().min(2, "Field password is too short").max(100, "Field password is too long").required("Field password is required"),
    new_password2: yup.string()
        .oneOf([yup.ref('new_password1'), null], "Passwords must match")
        .required('Field repeat password is required'),
})

export const addTrainingToDifferentDayValidation = yup.object().shape({
    name: yup.string().min(2, "Field training name is too short").required("Field training name is required"),
    date: yup.string().min(8, "Field date is invalid").required("Field date can't be empty")
})

export const resetPasswordValidation = yup.object().shape({
    email: yup.string().email('Field address email is invalid').required('Field address email is required'),
})

export const changePasswordviaTokenValidation = yup.object().shape({
    email: yup.string().email('Field address email is invalid').required("Field address email is required"),
    new_password1: yup.string().min(2, "Field password is too short").max(100, "Field password is too long").required("Field password is required"),
    new_password2: yup.string()
        .oneOf([yup.ref('new_password1'), null], 'Passwords must match')
        .required('Field repeat password is required'),
})