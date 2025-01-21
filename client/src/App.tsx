import { Navbar } from "./components/Navbar"
import { TaskInput } from "./components/Task-input"
import { ThemeProvider } from "./components/theme-provider"


function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />  
      <TaskInput />
    </ThemeProvider>
      
    </>
  )
}

export default App
