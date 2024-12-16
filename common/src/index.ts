import z from "zod"

export const singupInput = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string().optional()
})

export const singinInput = z.object({
    email: z.string(),
    password: z.string(),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string()
})

export type SingupInputType = z.infer<typeof singupInput> 
export type SinginInputType = z.infer<typeof singinInput> 
export type CreateBlogInputType = z.infer<typeof createBlogInput> 
export type UpdateBlogInputType = z.infer<typeof updateBlogInput> 