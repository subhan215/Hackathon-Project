
import { Provider } from "react-redux";
import store from './store/store';
import "./index.css"
import './App.css'
import Routing from "./routers/Routing";

function App() {
  return <div>
  
       <Provider store={store}>
       <Routing />
      </Provider>
   </div>
  
}

export default App;
