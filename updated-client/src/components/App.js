import React, { useState} from "react";
import { Provider } from "react-redux";
import { configureStore } from "../store";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "./Main";
import Notepad from './Notepad';
import './styles.css';
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from 'jwt-decode';

const store = configureStore();

//We set a jwtToken in localstorage to keep track of logged in users even when they refresh
if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);
  //prevent someone from manually tampering with the key of jwtTokaen in localStorage
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  }catch(error){
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => {
  //The selectedPrompt state object is passed to the Notepad component so it knows what the title should be.
  //The setSelectedPrompt function is passed to to the main container which passes it to the prompt comp to the promptitem
  //This allows the prompt item to update selectedPrompt when clicked
  const [selectedPrompt, setSelectedPrompt] = useState(null);


  return(
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Main onPromptSelect={setSelectedPrompt} prompt={selectedPrompt} />
          <Notepad prompt={selectedPrompt} />
        </div>
      </Router>
    </Provider>
  )
};




export default App;

// "start": "react-scripts start",