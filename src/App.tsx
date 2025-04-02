import { CContainer } from '@coreui/react'
import './App.css'
import { AppRouter } from './router'

function App() {

  return (
    <CContainer fluid className="App p-0">
      <AppRouter />
    </CContainer>
  )
}

export default App
