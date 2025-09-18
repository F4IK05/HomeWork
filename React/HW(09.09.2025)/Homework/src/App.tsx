import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./features/layout/Layout"
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { ThemeProvider } from "./components/shared/providers/ThemeProvider";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App;
