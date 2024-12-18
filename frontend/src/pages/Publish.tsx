import { AppBar } from "../components/Appbar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = function (){
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    return <div>
        <AppBar />
        <div className="flex flex-col w-full">
        <div className="max-w-screen-lg w-full ml-4 mt-4">
            <input onChange={(e)=>{
                (setTitle(e.target.value))
            }} type="text" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Blog Title" />
        </div>
        <div className="mt-3 w-full max-w-screen-lg ml-4">
             <TextEditor  onChange={(e)=>{
                (setContent(e.target.value))
            }} />
        </div>
        <div className="pl-3">
            <button type="submit"  onClick={async ()=>{
                let res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content
                },{
                headers: {
                    Authorization: "Bearer "+ localStorage.getItem("token")
                }
                })
                navigate(`/blog/${res.data.post_id}`)
   }} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
       Publish post
   </button>
        </div>
        </div>
    </div>
}

function TextEditor({onChange}:{onChange: (e: ChangeEvent<HTMLTextAreaElement>)=>void}){
    return <div>
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
       <div className="px-4 py-2 bg-white rounded-b-lg">
           <textarea onChange={onChange} id="editor" rows="8" className="block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required ></textarea>
       </div>
   </div>

</div>

}