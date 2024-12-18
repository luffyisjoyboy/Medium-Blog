import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { Blog } from "../pages/Blog"

export interface Blog {
    "title": string,
    "content":string,
    "published": string,
    "id":string,
    "author": {
        "name": string
    } 
}

export const useBlogs = ()=>{
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {headers: {
            Authorization: `Bearer `+ localStorage.getItem('token')
        }}).then(response=>{
            setBlogs(response.data.posts)
            setLoading(false)
        })
    },[])

    return {
        loading, blogs
    }
}

export const useBlog = ({id}:{id:string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(()=>{ 
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {headers: {
            Authorization : "Bearer "+ localStorage.getItem("token")
        }}).then(response=>{
            setLoading(false)
            setBlog(response.data.post)
        })
    }, [id])

    return {
        loading, blog
    }
}