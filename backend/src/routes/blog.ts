import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {verify} from "hono/jwt"
import {createBlogInput, updateBlogInput, CreateBlogInputType, UpdateBlogInputType} from "@batman_1337/common_cloudflare_worker"


type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}

type Variables = {
  userId: string
}

export const blogRoute = new Hono<{Bindings: Bindings, Variables:Variables}>()

blogRoute.use("*", async (c, next)=>{
  const data =  c.req.header()
  const token = data["authorization"].split(" ")[1]
  let response = await verify(token, c.env.JWT_SECRET)
  if(!response){
     c.status(403)
    return c.json({
    msg: "Not authorized",
    })
  }
  c.set("userId", String(response.userId))
  await next()
})

blogRoute.post("/", async (c)=>{
    const body: CreateBlogInputType = await c.req.json()
    const {success} = createBlogInput.safeParse(body)
  if(!success){
    return c.json({
      msg: "Invalid data"
    })
  }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    console.log("user----->", c.get("userId"))
    try{
        let post = await prisma.post.create({
            data:{
                title: body.title,
                content: body.content,
                authorId: c.get("userId")
            }
        })
        if(!post){
            return c.json("post creation failed")
        }
        c.status(200)
        return c.json({
            msg: "Post created successfully",
            post_id: post.id
        })
    }catch(error){
        c.status(403)
        console.log(error)
        return c.json("something went wrong with post creation")
    }
})

blogRoute.put("/", async (c)=>{
    const body:UpdateBlogInputType = await c.req.json()
    const {success} = updateBlogInput.safeParse(body)
  if(!success){
    return c.json({
      msg: "Invalid data"
    })
  }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        let post = await prisma.post.update({
            where :{
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        if(!post){
            return c.json({
                msg: "Post not updated"
            })
        }
        return c.json({
            msg: "post updated successfully",
            data: post
        })
    } catch(error){
        c.status(403)
        return c.json("something went wrong with post updation")
    }
})

blogRoute.get("/bulk", async (c)=>{
   const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        let posts = await prisma.post.findMany({
            select: {
                title:true,
                content:true,
                published: true,
                id:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if(!posts){
            return c.json({
                msg: "No Posts fetched"
            })
        }
        
        return c.json({
            posts
        })
    } catch(error){
        c.status(403)
        return c.json("something went wrong while fetching posts")
    }
})

blogRoute.get("/:id", async (c)=>{
    const id = c.req.param("id")
   const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        let post = await prisma.post.findUnique({
            where:{
                id: id
            },
            select: {
                title:true,
                content:true,
                published: true,
                id:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        if(!post){
            return c.json({
                msg: "No Post fetched"
            })
        }
        return c.json({
            post
        })
    } catch(error){
        c.status(403)
        return c.json("something went wrong while fetching post")
    }
})
