const yup = require("yup");

export const createGoalValidation = yup.object().shape({
    finishDate: yup.string().min(8, "Wprowadź poprawną date").required('Wybierz date'),
    goal: yup.string().min(2, "Cel jest za krótki").max(100, "Cel jest za długi wykorzystaj opis").required('Pole jest wymagane'),
    description: yup.string(),
});

export const updateGoalValidation = yup.object().shape({
    finishDate: yup.string().min(8, "Wprowadź poprawną date").required('Wybierz date'),
    goal: yup.string().min(2, "Cel jest za krótki").max(100, "Cel jest za długi wykorzystaj opis").required('Pole jest wymagane'),
    description: yup.string(),
    completed: yup.boolean().required()
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
    exercise: yup.object().nonNullable("Wybierz ćwiczenie").required("Wybierz ćwiczenie"),
    extra_weight: yup.number().max(10000, "Nie no tyle to nie. Tutaj wstaw tego mema. :)").required("Musisz uzupełnić wage").typeError("Dodatkowa waga musi być liczbą"),
    rest: yup.number().integer().max(10000).required("Musisz uzupełnić czas przerwy").typeError("Odpoczynek musi być liczbą"),
    reps: yup.number().required("Musisz uzupełnić liczbe powtórzeń").typeError("Liczba powtórzeń musi być liczbą"),
    concentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    pause_after_concentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    eccentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    pause_after_eccentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    series_count: yup.number().integer().min(1, "Liczba jest za mała").max(50, "Liczba serii jest za duża").typeError("Liczba serii musi być liczbą całkowitą od 0 od 100"),
})

export const createSingleSeriesValidation = yup.object().shape({
    exercise: yup.object().nonNullable("Wybierz ćwiczenie").required("To pole jest wymagane"),
    extra_weight: yup.number().max(10000, "Nie no tyle to nie. Tutaj wstaw tego mema. :)").required("Musisz uzupełnić wage").typeError("Dodatkowa waga musi być liczbą"),
    rest: yup.number().integer().max(10000).required("Musisz uzupełnić czas przerwy").typeError("Odpoczynek musi być liczbą całkowitą"),
    reps: yup.number().required("Musisz uzupełnić liczbe powtórzeń").typeError("Liczba powtórzeń musi być liczbą"),
    concentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    pause_after_concentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    eccentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
    pause_after_eccentric_phase: yup.number().typeError("Fazy muszą być liczbami"),
})


export const createTrainingValidation = yup.object().shape({
    name: yup.string().min(2, "Nazwa jest za krótka").max(100, "Nazwa jest za długa wykorzystaj opis").required('Pole nazwa jest wymagane'),
    date: yup.string().min(2, "Musisz wybrać date").required("Pole data jest wymagane"),
    description: yup.string().max(5000, "Opis jest za długi"),
    multi_series: yup.array().min(1, 'Przynajmniej jedna seria jest wymagana')

})

export const loginUserValidation = yup.object().shape({
    username: yup.string().min(4, "Nazwa użytkownika jest za krótka").max(100, "Nazwa użytkownika jest za długa ").required('Pole username jest wymagane'),
    password: yup.string().min(4, "Hasło jest za krótkie").max(100, "Hasło jest za długie").required('Pole hasło jest wymagane'),
})

export const registerUserValidation = yup.object().shape({
    username: yup.string().min(4, "Nazwa użytkownika jest za krótka").max(100, "Nazwa użytkownika jest za długa ").required('Pole username jest wymagane'),
    email: yup.string().email('Podany adres e-mail nie jest prawidłowy.').required('Adres e-mail jest wymagany.'),
    password: yup.string().min(4, "Hasło jest za krótkie").max(100, "Hasło jest za długie").required('Pole hasło jest wymagane'),
    password2: yup.string()
        .oneOf([yup.ref('password'), null], 'Hasła muszą być identyczne.')
        .required('Potwierdzenie hasła jest wymagane.'),
})

export const createExerciseModalValidation = yup.object().shape({
    name: yup.string().required('Stare hasło jest wymagane'),
    password: yup.string().min(2, "Hasło jest za krótkie").max(100, "Hasło jest za długie")
    // .min(2, "Nazwa ćwiczenia jest za krótka")
})

export const changePasswordValidation = yup.object().shape({
    old_password: yup.string().required('Pole stare hasło jest wymagane'),
    new_password1: yup.string().min(2, "Hasło jest za krótkie").max(100, "Hasło jest za długie").required('Pole hasło jest wymagane'),
    new_password2: yup.string()
        .oneOf([yup.ref('new_password1'), null], 'Hasła muszą być identyczne.')
        .required('Potwierdzenie hasła jest wymagane.'),
})

export const addTrainingToDifferentDayValidation = yup.object().shape({
    name: yup.string().min(2, "Nazwa treningu jest za krótka").required("Pole name nie może być puste"),
    date: yup.string().min(8, "Data się nie zgadza").required("Pole data nie może być puste")
})

export const resetPasswordValidation = yup.object().shape({
    email: yup.string().email('Podany adres e-mail nie jest prawidłowy.').required('Adres e-mail jest wymagany.'),
})

export const changePasswordviaTokenValidation = yup.object().shape({
    email: yup.string().email('Podany adres e-mail nie jest prawidłowy.').required('Adres e-mail jest wymagany.'),
    new_password1: yup.string().min(2, "Hasło jest za krótkie").max(100, "Hasło jest za długie").required('Pole hasło jest wymagane'),
    new_password2: yup.string()
        .oneOf([yup.ref('new_password1'), null], 'Hasła muszą być identyczne.')
        .required('Potwierdzenie hasła jest wymagane.'),
})