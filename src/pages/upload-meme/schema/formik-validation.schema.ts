// import { FormikFormProps } from "../types/formik.types";
import {Meme} from "@/models/meme.model";
import * as Yup from "yup";

export const initUploadValues: Partial<Meme> = {
  title: "",
  description: "",
  tags: [],
  imageUrls: [],
  attribution: {
    originalCreator: "",
    source: "",
  },
};

export const uploadValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  tags: Yup.array().of(Yup.string()).min(1, "At least one tag is required"),
//   imageUrls: Yup.array()
//     .of(Yup.string().url("Must be a valid URL"))
//     .min(1, "At least one image URL is required"),
  attribution: Yup.object().shape({
    originalCreator: Yup.string(),
    source: Yup.string().url("Must be a valid URL"),
  }),
});
