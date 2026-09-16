import "./App.css";
import "./meerkat.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MeerkatBlog from "./pages/MeerkatBlog";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MeerkatBlog />} />
          <Route path="/blog/meerkat" element={<MeerkatBlog />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
