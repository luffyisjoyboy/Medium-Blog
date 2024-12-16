import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from "hono/jwt"
import {singupInput, singinInput, SingupInputType, SinginInputType} from "@batman_1337/common_cloudflare_worker"

type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}

type Variables = {
  userId: string
}

export const userRoute = new Hono<{Bindings: Bindings, Variables:Variables}>()

userRoute.post("/signup", async (c)=>{
  const data:SingupInputType = await c.req.json()
  const {success} = singupInput.safeParse(data)
  if(!success){
    return c.json({
      msg: "Invalid data"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  try{
     const user = await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
    }
  })
  const token = await sign({userId:user.id}, c.env.JWT_SECRET)
  c.status(200)
  return c.json({
    msg: "user created",
    token
  })
  } catch(error){
    c.status(403)
    return c.json({
    msg: "User creation failed",
    })
    }
})

userRoute.post("/signin", async(c)=>{
  const data:SinginInputType = await c.req.json()
  const {success} = singinInput.safeParse(data)
  if(!success){
    return c.json({
      msg: "Invalid data"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
    let user = await prisma.user.findUnique({
    where: {
      email: data.email,
      password: data.password
    }
  })
  if(!user){
    return c.json({
      msg: "User doesn't exist"
    })
  }
  const token = await sign({userId: user.id}, c.env.JWT_SECRET)
  return c.json({
    token,
    msg: "User login successful"
  })
  } catch(error){
    c.status(403)
    return c.json({
    msg: "User login failed",
    })
  }
})