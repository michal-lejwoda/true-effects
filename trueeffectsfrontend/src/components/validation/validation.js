const yup = require("yup");

export const createGoalValidation = yup.object().shape({
    finishDate: yup.string().required('Wybierz date'),
    goal: yup.string().min(2, "Cel jest za krótki").max(100, "Cel jest za długi wykorzystaj opis").required('Pole jest wymagane'),
    description: yup.string(),
});

export const settingsDimensionValidation = yup.object().shape({
    id: yup.number().required(),
    weight: yup.boolean().required(),
    growth: yup.boolean().required(),
    left_biceps: yup.boolean().required(),
    right_biceps: yup.boolean().required(),
    left_forearm: yup.boolean().required(),
    right_forearm: yup.boolean().required(),
    left_leg: yup.boolean().required(),
    right_leg: yup.boolean().required(),
    bodyfat: yup.boolean().required(),
});