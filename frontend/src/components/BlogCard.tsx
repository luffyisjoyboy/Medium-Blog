import { Link } from "react-router-dom"
interface BlogCardProps {
    id: string
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = function({authorName, title, content, publishedDate, id}:BlogCardProps){
    return <Link to={`/blog/${id}`}>
    <div className="p-4  border-b border-slate-200 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} /> 
                <div className="font-extralight pl-2 flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-center flex-col pl-1"><Circle /></div>
                <div className=" flex justify-center flex-col font-thin pl-2 text-slate-400">{publishedDate}</div>
            </div>
            <div className="font-semi-bold text-2xl pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.length > 100 ?  content.slice(0,100)+"..." : content.slice(0,100)}
            </div>
            <div className="text-slate-350 font-thin text-sm pt-4">
                {`${Math.ceil(content.length/100)} min Read`}
            </div>
    </div>
    </Link>
}

export function Avatar({name, size="small"}:{name:string, size?: "small"| "big"}){
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size=== "small"? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`text-gray-600 dark:text-gray-300 ${size==="small"? "font-xs" : "font-md"} `}>{name[0]}</span>
</div>

}

function Circle() {
    return <div className="rounded-full h-1 w-1 bg-slate-950">

    </div>
}