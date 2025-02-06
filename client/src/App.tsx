import  Navbar  from './components/Navbar';
import TaskContainer from './components/TaskContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className='animated-background'>
          <Navbar />
          <TaskContainer />
        </div>
      </QueryClientProvider>  
    </>
  );
}

export default App;
