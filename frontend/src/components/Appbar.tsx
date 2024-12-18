import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = ()=>{
    return <div className="flex justify-between px-10 py-4 border-b">
        <div className="flex flex-col justify-center cursor-pointer">
            <Link to={"/blogs"}>Medium</Link>
        </div>
        
        <div className="flex">
            <Link to={"/blog/publish"}><div><button type="button" className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">New</button></div></Link>
            <div><Avatar name="A" size={"big"}/></div>
        </div>
    </div>
}