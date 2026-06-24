import {email, z} from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string().describe("Name of the User"),
    email:z.email().describe("Email of the User"),
    password: z.string().describe("Password of the User")
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id : z.string().describe("Id of the User")
})

export const signInUserWithEmailAndPasswordInputModel = z.object({
    email:z.email().describe("Email of the User"),
    password: z.string().describe("Password of the User")
})

export const signInUserWithEmailAndPasswordOutputModel = z.object({
    id : z.string().describe("Id of the User")
})

export const getLoggedInUserInfoInputModel = z.undefined();
export const getLoggedInUserInfoOutputModel = z.object({
    id : z.string().describe("Id of the User"),
    fullName: z.string().describe("Name of the User"),
    email:z.email().describe("Email of the User"),
})

