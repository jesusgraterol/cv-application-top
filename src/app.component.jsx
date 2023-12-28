import { useReducer } from 'react';
import appReducer from './app.reducer';
import Database from './services/shared/database/database.service';
import Header from './components/header/header.component';
import About from './components/about/about.component';
import Experience from './components/experience/experience.component';
import Education from './components/education/education.component';

function App() {
  const [ record, dispatch ] = useReducer(appReducer, Database.get());
  return (
    <div id="appContainer">

      <span className="separator"></span>

      <main>

        <Header record={record} dispatch={dispatch} />

        <About record={record} dispatch={dispatch} />

        <Experience record={record} dispatch={dispatch} />

        <Education record={record} dispatch={dispatch} />
        
      </main>

      <span className="separator"></span>

    </div>
  )
}

export default App;
