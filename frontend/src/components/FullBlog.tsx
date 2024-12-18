import { AppBar } from "./Appbar"
import { Blog } from "../hooks/index"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: Blog})=>{
    return <div>
        <AppBar />
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="col-span-8">
                        <div className="text-5xl font-extrabold">{blog.title}</div>
                        <div>Posted on {blog.published || "22-Dec-2024"}</div>
                        <div className="pt-4">{blog.content}</div>
                    </div>
                    <div className="col-span-4">
                            Author:
                         <div className="flex">
                            <Avatar name={blog.author.name || "Anonymous"} />
                            <div className="text-lg-2xl font-bold pl-1 flex flex-col justify-center">{blog.author.name || "Anonymous"}</div>
                         </div>
                         <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, praesentium!
                         </div>
                    </div>
                </div>
            </div>
    </div>
}