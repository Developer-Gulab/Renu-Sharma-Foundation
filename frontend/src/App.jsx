import { BrowserRouter, Route, Routes } from "react-router-dom";
import DonatePage from "./pages/DonatePage";
import SuccessPage from "./pages/Success";
import CancelPage from "./pages/Cancel";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/donate-page" element={<DonatePage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
