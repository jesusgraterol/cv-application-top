import { useState } from 'react';
import PropTypes from 'prop-types';
import AboutForm from './about-form.component';

/**
 * About Component
 * ...
 */
function About({ record, dispatch }) {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <>

      <section  id="about" 
                onMouseEnter={() => setSectionHovered(true)} 
                onMouseLeave={() => setSectionHovered(false)}>

        <header>
          <h2>About</h2>
          <span className="separator"></span>
          {
          sectionHovered && 
            <button className="icon-btn primary raised" 
                    aria-label="Edit the About Section" 
                    onClick={() => setModal(true)}>
              <span className="md-icon" aria-hidden="true">edit</span>
            </button>
          }

        </header>

        <article>
          <p>{record.bio}</p>
        </article>

      </section>

      <AboutForm modal={modal} setModal={setModal} record={record} dispatch={dispatch} />

    </>
  );
}
About.propTypes = {
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}





/**
 * Module Exports
 */
export default About;