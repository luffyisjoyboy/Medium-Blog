import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { data, Link, useNavigate } from "react-router-dom"
import {SingupInputType} from "@batman_1337/common_cloudflare_worker"
import axios from "axios"
import { BACKEND_URL } from "../config"

// trpc project go through it
export const Author = ({type}:{type:"signup" | "signin"})=>{
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState<SingupInputType>({
        email:"",
        password: "",
        name:"",
    })

    async function sendRequest(){
        try{
            console.log(postInputs)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"? "signup": "signin"}`, postInputs) 
            const jwt = response.data;
            localStorage.setItem('token', jwt.token)
            navigate("/blogs");
        } catch(error){
            console.log(error)
        }
    }

    return <div className="flex justify-center h-screen">
            <div className="flex flex-col justify-center">   
            <div className="text-3xl font-bold">
                {type==="signin"? "Login": "Create an account"}
            </div>
            <div className="text-slate-400 mt-1">
                {type=== "signin"? "Don't have an Account?" : "Already have an account?"}
                <Link to={type==="signin"?"/signup" : "/signin" } className=" pl-1 underline">{type==="signin"?"Signup": "Login"}</Link>
            </div>
            <div>
                {type==="signup"? <LabelledInput label="Name" placeholder="Enter your name" type="text"  onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        name:e.target.value
                    }))
                }}/> : null}
            </div>
            <div>
                <LabelledInput label="Email" placeholder="Enter you email" type="text" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        email:e.target.value
                    }))
                }}/>
            </div>
            <div>
                <LabelledInput label="Password" placeholder="Enter your password" type="password" onChange={(e)=>{
                    setPostInputs(c=>({
                        ...c,
                        password: e.target.value
                    }))
                }} />
            </div>
            <div>
                 <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 mt-3 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full text-center">{type === "signup" ? "SignUp":"Sign In"}</button>
            </div>
            </div>
    </div>
}

type LabelledInputTypes = {
    label:string,
    placeholder:string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type: string
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputTypes){
    return <div>
            <label className="block mb-2 mt-4 text-sm  text-gray-900 dark:text-black font-semibold">{label}</label>
            <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
}