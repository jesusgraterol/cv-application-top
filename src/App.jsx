import { useState } from 'react';
import Modal from './components/shared/modal/modal.component';
import Header from './components/header/header.component';
import About from './components/about/about.component';
import Experience from './components/experience/experience.component';
import Education from './components/education/education.component';

function App() {
  const [modal, setModal] = useState(false);

  return (
    <div id="appContainer">
      <span className="separator"></span>

      <main>
        <Header/>

        <About />

        <Experience />

        <Education />

        <button
          onClick={() => setModal(true)}
        >
          Open modal
        </button>
        <Modal
          openModal={modal}
          closeModal={() => setModal(false)}
        >
          Modal content.
        </Modal>
      </main>

      <span className="separator"></span>
    </div>
  )
}

export default App;
