import { Navbar } from "./components/navbar"
import { ThemeProvider } from "./components/theme-provider"


function App() {

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />  
    </ThemeProvider>
      
    </>
  )
}

export default App
