import * as yup from "yup";

export const userSchema = yup.object().shape({
    //name: yup.string().required(),
    email:yup.string().email().required(),
    password: yup.string().min(7).max(14).required()
})