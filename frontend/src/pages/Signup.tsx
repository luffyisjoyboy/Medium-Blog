import { Quote } from "../components/Quote"
import { Author } from "../components/Author"

export const Signup = function (){
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Author type="signup" />
        </div>
        <div className="hidden lg:block">
             <Quote />
        </div>
    </div>
}