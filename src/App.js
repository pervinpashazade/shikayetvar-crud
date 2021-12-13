import { HashRouter } from "react-router-dom";
import Content from "./components/common/Content";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import './assets/bootstrap/bootstrap.scss';
import './assets/scss/style.scss';

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Header />
        <Content />
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;