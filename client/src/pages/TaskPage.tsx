import Navbar from "@/components/Navbar";
import TaskContainer from "@/components/TaskContainer";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export function TaskPage() {

    useCurrentUser();

    return (
    <>
        <div className='animated-background'>
            <Navbar />
            <TaskContainer />
        </div>
    </>
)
    
}