import { FullBlog } from "../components/FullBlog"
import { Skeleton } from "../components/Skeleton"
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"
export const Blog = function (){
     const {id}: string = useParams()
     const {loading, blog} = useBlog({id: id || ""})
     if(loading){
        return <Skeleton />
    }
    console.log(blog)
    return <div>
        <FullBlog blog={blog}/>
    </div>
}
