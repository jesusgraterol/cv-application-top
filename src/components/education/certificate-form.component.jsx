/* eslint-disable no-useless-escape */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Database from '../../services/shared/database/database.service';
import Modal from '../shared/modal/modal.component';

/**
 * Component Globals
 */
const currentYear = new Date.getFullYear();





/**
 * Certificate Form Component
 * ...
 */
function CertificateForm({ modal, setModal, record, dispatch, itemID }) {
  // init the certificate if an id was provided
  const cert = typeof itemID === 'string' 
    ?  record.education.find((cert) => cert.id === itemID) : null;

  // init the form controls
  const [ controls, setControls ] = useState({
    title: { 
      value: cert ? cert.title : '', 
      valid: cert !== null, 
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{2,200}$/.test(val) 
    },
    issuer: { 
      value: cert ? cert.issuer : '', 
      valid: cert !== null, 
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{2,200}$/.test(val) 
    },
    startMonth: { 
      value: cert ? cert.start.month : '', 
      valid: cert !== null, 
      validate: (val) => val.length > 0
    },
    startYear: { 
      value: cert ? cert.start.year : '', 
      valid: cert !== null, 
      validate: (val) => val >= 1980 && val <= currentYear
    },
    endMonth: { 
      value: cert ? cert.end.month : '', 
      valid: cert !== null, 
      validate: () => true
    },
    endYear: { 
      value: cert ? cert.end.year : '', 
      valid: cert !== null, 
      validate: () => true
    },
  });
  const [ formValid, setFormValid ] = useState(true);

  // input changes event handler
  const handleOnChange = (e) => {
    setBio(e.target.value);
    setFormValid(/^(.|\s){5,1000}$/.test(e.target.value));
  }

  // form submission event handler
  const handleFormSubmission = (e) => {
    e.preventDefault();
    Database.set({ ...record, bio: bio });
    dispatch({
      type: 'update_bio',
      newBio: bio
    });
    setModal(false);
  }


  return (
    <Modal openModal={modal} closeModal={() => setModal(false)}>

      <header>
        <h2>Certificate</h2>
        <button className="icon-btn" aria-label="Close Dialog" onClick={() => setModal(false)}>
          <span aria-hidden="true" className="md-icon">close</span>
        </button>
      </header>

      <article className="form">

        <form noValidate onSubmit={handleFormSubmission}>

          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="bio">Bio*
                      <textarea id="bio" 
                                name="bio" 
                                onChange={(e) => handleOnChange(e)} 
                                rows="7"
                                value={bio}></textarea>
                  </label>
                  <p className="error" style={{ visibility: formValid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid bio
                  </p>
              </div>
          </div>
          
          <button className="btn primary full-width" type="submit" disabled={!formValid}>
            SUBMIT
          </button>

          {
            itemID &&
            <button className="btn error-color full-width" type="button">
              DELETE
            </button>
          }

        </form>

      </article>

    </Modal>
  );
}
CertificateForm.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  itemID: PropTypes.string,
};




/**
 * Module Exports
 */
export default CertificateForm;