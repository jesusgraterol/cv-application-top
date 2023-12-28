import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Certificate from './certificate.component';
import CertificateForm from './certificate-form.component';

/**
 * Education Component
 * ...
 */
function Education({ record, dispatch }) {
  const [ sectionHovered, setSectionHovered ] = useState(false);
  const [modal, setModal] = useState(false);
  const editItemID = useRef(null);

  const addItem = () => {
    editItemID.current = null;
    setModal(true);
  }

  const editItem = (itemID) => {
    editItemID.current = itemID;
    setModal(true);
  }

  return (
    <>

      <section  id="education" 
                onMouseEnter={() => setSectionHovered(true)} 
                onMouseLeave={() => setSectionHovered(false)}>

        <header>
          <h2>Education</h2>
          <span className="separator"></span>
          {
            sectionHovered &&
            <button className="icon-btn primary raised" 
                    aria-label="Add Education Item" 
                    onClick={addItem}>
              <span className="md-icon" aria-hidden="true">add</span>
            </button>
          }
        </header>

        {record.education.map((cert) => {
          return <Certificate key={cert.id} certificate={cert} editItem={editItem} />
        })}

      </section>
    
      {
        modal &&
        <CertificateForm  
          modal={modal} 
          setModal={setModal} 
          record={record} 
          dispatch={dispatch}
          itemID={editItemID.current} />
      }

    </>

  );
}
Education.propTypes = {
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}




/**
 * Module Exports
 */
export default Education;