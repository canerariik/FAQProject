import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Questions from "../components/Questions";
import Categories from "../components/Categories";
import Departments from "../components/Departments";

function HomePage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/questions" element={<Questions />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/departments" element={<Departments />} />
        </Routes>
      </div>
    </>
  );
}

export default HomePage;
