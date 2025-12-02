import { BrowserRouter as Router } from "react-router-dom";
import Header from "./shared/component/header";
import Footer from "./shared/component/footer";
import AppRoutes from "./shared/routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
