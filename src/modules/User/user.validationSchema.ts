import { z } from "zod";

export const signUpValidationSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string(),
    cPass: z.string(),
    age: z.number().min(10),
    role: z.enum(['user','admin']).default('user'),
}).required().superRefine((val:any,ctx:any)=>{
    
    
    if(val.password !== val.cPass){
        ctx.addIssue({
            code:z.ZodIssueCode.custom,
            message:"passwords don't match",
            path:["cPass"]
        })
    }
})

export const loginValidationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
}).required()