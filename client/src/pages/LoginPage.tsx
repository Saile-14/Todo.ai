import Navbar from "@/components/Navbar";
import { LoginForm } from "@/components/loginForm";


export function LoginPage() {
    return (
        <>
        <div className='animated-background min-h-dvh  '>
            <Navbar />
            <LoginForm className="bg-white mt-16 rounded-lg py-8 px-10 w-1/4 mx-auto"/>
        </div>
            
        </>
    )
}