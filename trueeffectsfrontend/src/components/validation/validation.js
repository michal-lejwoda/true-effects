const yup = require("yup");

export const createGoalValidation = yup.object().shape({
  finishDate: yup.string().required('Wybierz date'),
  goal: yup.string().min(2, "Cel jest za krótki").max(100, "Cel jest za długi wykorzystaj opis").required('Pole jest wymagane'),
  description: yup.string(),
});