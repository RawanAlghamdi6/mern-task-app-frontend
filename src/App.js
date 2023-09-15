import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tasklist from "./components/Tasklist";

export const URL = process.env.REACT_APP_SERVER_URL
function App() {
  return (
    <div className="app">
    
    <div className="task-container">
       
     <Tasklist/>
     

    </div>
    <ToastContainer />
    </div>
  );
}

export default App;
