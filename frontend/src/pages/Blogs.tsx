import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/Appbar"
import { useBlogs } from "../hooks"
import { Skeleton } from "../components/Skeleton"
export const Blogs = function (){
    const {loading, blogs} = useBlogs()
    if(loading){
        return  <Skeleton />
    }
    return <div>
        <AppBar />
        <div className="flex justify-center">
        <div>
            {blogs.map((blog)=>{
        console.log("blog----->", blog)
                return <BlogCard title={blog.title} content={blog.content}  publishedDate={blog.published || `12-Dec-23`} authorName={blog.author.name || "Anonymous"} id={blog.id} key={blog.id}/>
            })}
    </div>
    </div>
    </div>
}
