import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonatePage from "./Pages/DonatePage";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DonatePage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
