import {z} from "zod";





const RegisterValidation = z.object({
    body: z.object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        email: z.string().email(),
        password: z.string().min(6, "Password must be at least 6 characters long"),
        gender: z.enum(["MALE", "FEMALE"]),
        districtId: z.string(),
        divisionId: z.string(),
    })
})


const LoginValidation = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(6, "Password must be at least 6 characters long"),
    })
})


export const AuthValidation = {
    RegisterValidation,
    LoginValidation
}