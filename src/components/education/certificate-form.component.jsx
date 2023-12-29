/* eslint-disable no-useless-escape */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Utilities from '../../services/shared/utilities/utilities';
import Database from '../../services/shared/database/database.service';
import Modal from '../shared/modal/modal.component';

/**
 * Component Globals
 */
const currentYear = new Date().getFullYear();





/**
 * Certificate Form Component
 * ...
 */
function CertificateForm({ modal, setModal, record, dispatch, itemID }) {
  // init the certificate if an id was provided
  const cert = record.education.find((cert) => cert.id === itemID);

  // init the form controls
  const [ controls, setControls ] = useState({
    title: { 
      value: cert?.title, 
      valid: cert !== undefined, 
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{2,200}$/.test(val) 
    },
    issuer: { 
      value: cert ? cert.issuer : '', 
      valid: cert !== undefined, 
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{2,200}$/.test(val) 
    },
    startMonth: { 
      value: cert ? cert.start.month : '', 
      valid: cert !== undefined, 
      validate: (val) => val.length > 0
    },
    startYear: { 
      value: cert ? cert.start.year : '', 
      valid: cert !== undefined, 
      validate: (val) => val >= 1980 && val <= currentYear
    },
    endMonth: { 
      value: cert ? cert.end.month : '', 
      valid: cert !== undefined, 
      validate: () => true
    },
    endYear: { 
      value: cert ? cert.end.year : '', 
      valid: cert !== undefined, 
      validate: (val) => typeof val !== 'number' ? true : val >= 1980 && val <= currentYear
    },
  });
  const [ formValid, setFormValid ] = useState(cert !== undefined);
  console.log(controls);
  // input changes event handler
  const handleOnChange = (e) => {
    const nextControls = {
      ...controls,
      [e.target.name]: {
        ...controls[e.target.name],
        value: e.target.value,
        valid: controls[e.target.name].validate(e.target.value)
      }
    };
    setControls(nextControls);
    setFormValid(Object.values(nextControls).every((control) => control.valid));
  }

  // form submission event handler
  const handleFormSubmission = (e) => {
/*     e.preventDefault();
    Database.set({ ...record, bio: bio });
    dispatch({
      type: 'update_bio',
      newBio: bio
    });
    setModal(false); */
  }

  // delete item event handler
  const handleDeleteButtonClick = () => {
    /*  */
  }

  return (
    <Modal openModal={modal} closeModal={() => setModal(false)}>

      <header>
        <h2>Certificate</h2>
        <button className="icon-btn" aria-label="Close Dialog" onClick={() => setModal(false)}>
          <span aria-hidden="true" className="md-icon">close</span>
        </button>
      </header>

      <article className="form" id="certificateForm">

        <form noValidate onSubmit={handleFormSubmission}>

        { /* Title */ }
          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="title">Title*
                      <input  type="text" 
                              name="title" 
                              id="title" 
                              value={controls.title.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.title.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid title
                  </p>
              </div>
          </div>

          { /* Issuer */ }
          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="issuer">Issuer*
                      <input  type="text" 
                              name="issuer" 
                              id="issuer" 
                              value={controls.issuer.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.issuer.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid issuer
                  </p>
              </div>
          </div>

          { /* Start */ }
          <fieldset>
            <p><strong>Start Date</strong></p>
            <div className="form-row">
              <div className="form-control">
                <label htmlFor="startMonth">Month*
                    <select name="startMonth" 
                            id="startMonth" 
                            value={controls.startMonth.value} 
                            onChange={(e) => handleOnChange(e)}>
                        <option key="" value=""></option>
                        {Utilities.monthNames.map((name, index) => {
                          return <option key={index} value={index}>{name}</option>;
                        })}
                    </select>
                </label>
                <p  className="error" 
                    style={{ visibility: controls.startMonth.valid ? 'hidden': 'visible' }}>
                    <span className="md-icon">error</span> Enter a valid month
                </p>
              </div>
              <div className="form-control">
                  <label htmlFor="startYear">Year*
                      <input  type="number" 
                              name="startYear" 
                              id="startYear" 
                              value={controls.startYear.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.startYear.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid year
                  </p>
              </div>
            </div>
          </fieldset>

          { /* End */ }
          <fieldset>
            <p><strong>End Date</strong></p>
            <div className="form-row">
              <div className="form-control">
                <label htmlFor="endMonth">Month
                    <select name="endMonth" 
                            id="endMonth" 
                            value={controls.endMonth.value} 
                            onChange={(e) => handleOnChange(e)}>
                        <option key="" value=""></option>
                        {Utilities.monthNames.map((name, index) => {
                          return <option key={index} value={index}>{name}</option>;
                        })}
                    </select>
                </label>
                <p  className="error" 
                    style={{ visibility: controls.endMonth.valid ? 'hidden': 'visible' }}>
                    <span className="md-icon">error</span> Enter a valid month
                </p>
              </div>
              <div className="form-control">
                  <label htmlFor="endYear">Year
                      <input  type="number" 
                              name="endYear" 
                              id="endYear" 
                              value={controls.endYear.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.endYear.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid year
                  </p>
              </div>
            </div>
          </fieldset>
          
          <button className="btn primary full-width" type="submit" disabled={!formValid}>
            SUBMIT
          </button>

          {
            itemID &&
            <button className="btn error-color full-width" 
                    type="button" 
                    onClick={handleDeleteButtonClick}>
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