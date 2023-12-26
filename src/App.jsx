import Header from "./components/header/header.jsx";
import About from "./components/about/about.jsx";
import Experience from "./components/experience/experience.jsx";
import Education from "./components/education/education.jsx";

function App() {

  return (
    <div id="appContainer">
      <span className="separator"></span>

      <main>
        <Header/>

        <About />

        <Experience />

        <Education />
      </main>

      <span className="separator"></span>
    </div>
  )
}

export default App;
