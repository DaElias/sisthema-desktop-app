import ListCustomers from "./components/ListCustomers/ListCustomers";
import ModalComponent from "./components/ModalComponent/ModalComponent";
import NavBar from "./components/NavBar/NavBar";
import "./index.css";

function App() {

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />
      <ListCustomers />
    </div>
  );
}

export default App;
