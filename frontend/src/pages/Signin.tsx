import { Quote } from "../components/Quote"
import { Author } from "../components/Author"

export const Signin = function (){
    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Author type="signin" />
        </div>
        <div className="hidden lg:block">
             <Quote />
        </div>
    </div>
}


