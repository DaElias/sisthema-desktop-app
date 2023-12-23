import { open } from "@tauri-apps/api/shell";
import ListCustomers from "./components/ListCustomers/ListCustomers";
import NavBar from "./components/NavBar/NavBar";
import "./index.css";

function App() {

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />
      <ListCustomers />
      <div className="flex gap-2 justify-end items-center mx-auto max-w-screen-xl py-5 px-4 sm:px-6 lg:px-8 opacity-80">
        <p className="text-center text-sm font-medium dark:text-white/75">
          Created with ❤️ by
        </p>
        <span
          onClick={() => open("https://github.com/DaElias")}
          className="hover:underline mr-10 cursor-context-menu font-bold dark:bg-slate-100">
          DeCerchiaro
        </span>
      </div>
    </div>
  )
}

export default App
