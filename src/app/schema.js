import * as Yup from "yup";

export const TimerFormSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be 2 charactors or more."),

  day: Yup.string()
    .required("Day is required")
    .min(1, "Day is not valid (DD format)")
    .max(2, "Day is not valid (DD format)")
    .matches(/^\d+$/, "Day is not a number"),

  month: Yup.string()
    .required("Month is required")
    .min(1, "Month is not valid (MM format)")
    .max(2, "Month is not valid. (MM format)")
    .matches(/^\d+$/, "Month is not a number"),
  year: Yup.string()
    .required("Year is required")
    .min(4, "Year is not valid (YYYY format)")
    .max(4, "Year is not valid (YYYY format)")
    .matches(/^\d+$/, "Year is not a number"),
  minute: Yup.string()
    .required("Minute is required")
    .min(1, "Minute is not valid (H:MM format)")
    .max(2, "Minute is not valid (H:MM format)")
    .matches(/^([0]?[0-9]|[0-5][0-9])$/, "Minute is not valid."),
  hour: Yup.string()
    .required("Hour is required")
    .min(1, "Hour is not valid (H:MM format)")
    .max(2, "Hour is not valid (H:MM format)")
    .matches(/^([1-9]|1[0-2])$/, "Hour is not valid."),
  am: Yup.boolean().required("AM/PM is required"),
});
