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

export const createDimensionValidation = yup.object().shape({
    weight: yup.number().nullable(false).required("Waga jest wymagana"),
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
    name: yup.string().min(2, "Nazwa jest za krótka").max(100, "Nazwa jest za długa wykorzystaj opis").required('Pole jest wymagane'),
    description: yup.string().max(5000, "Opis jest za długi"),
    extra_weight: yup.number().max(10000, "Nie no tyle to nie. Tutaj wstaw tego mema. :)").required("Musisz uzupełnić wage"),
    rest: yup.number().typeError("Odpoczynek musi być liczbą"),
    reps: yup.number().typeError("Liczba powtórzeń musi być liczbą"),
    concentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    pause_after_concentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    eccentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    pause_after_eccentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
})