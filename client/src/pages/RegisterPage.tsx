import Navbar from "@/components/Navbar";
import { RegisterForm } from "@/components/registerForm";


export function RegisterPage() {
    return (
        <>
        <div className='animated-background min-h-dvh  '>
            <Navbar />
            <RegisterForm className="bg-white mt-16 rounded-lg py-8 px-10 w-1/4 mx-auto"/>
        </div>
            
        </>
    )
}