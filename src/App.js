import InteriorDesignPage from "./InteriorDesignPage";
import Navbar from "./Navbar"
import { BrowserRouter,Routes,Route } from "react-router";
import LoginPage from "./LoginPage";
import RegisterForm from "./RegisterForm";

import CreateNotes from "./CreateNotes";
import Options from "./Setting";

function App() {
  
  return (
    <>
    
<BrowserRouter>
<Routes>
<Route path="/" element={<InteriorDesignPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterForm />} />
  <Route path="/nav" element={<Navbar />} />
<Route path="/note/create" element={<CreateNotes />} />
  <Route path="/setting" element={<Options />} />
 
</Routes>
</BrowserRouter>
    </>
  );
}

export default App;
