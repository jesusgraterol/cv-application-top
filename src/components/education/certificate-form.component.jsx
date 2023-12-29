/* eslint-disable no-useless-escape */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Utilities from '../../services/shared/utilities/utilities';
import Database from '../../services/shared/database/database.service';
import Modal from '../shared/modal/modal.component';
import FormControl from '../shared/form-control/form-control.component';

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
      validate: (val) => {
        val = Number(val)
        return val >= 1980 && val <= currentYear
      }
    },
    endMonth: { 
      value: cert ? cert.end.month : '', 
      valid: cert !== undefined, 
      validate: () => true
    },
    endYear: { 
      value: cert ? cert.end.year : '', 
      valid: cert !== undefined, 
      validate: (val) => {
        if (!val.length) {
          return true;
        }
        val = Number(val);
        return val >= 1980 && val <= currentYear;
      }
    },
  });
  const [ formValid, setFormValid ] = useState(cert !== undefined);

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
              <FormControl  title='Title*' 
                            name='title' 
                            value={controls.title.value} 
                            onChange={handleOnChange} 
                            error={controls.title.valid ? undefined: 'Enter a valid title'} />
          </div>

          { /* Issuer */ }
          <div className="form-row">
              <FormControl  title='Issuer*' 
                            name='issuer' 
                            value={controls.issuer.value} 
                            onChange={handleOnChange} 
                            error={controls.issuer.valid ? undefined: 'Enter a valid issuer'} />
          </div>

          { /* Start */ }
          <fieldset>
            <p><strong>Start Date</strong></p>
            <div className="form-row">
              <FormControl  type='select'
                                title='Month*' 
                                name='startMonth' 
                                value={controls.startMonth.value} 
                                options={Utilities.monthNames.map((name, i) => {
                                  return { name: name, value: i };
                                })}
                                onChange={handleOnChange} 
                                error={controls.startMonth.valid ? undefined: 'Enter a valid start month'} />

              <FormControl  type='number'
                            title='Year*' 
                            name='startYear' 
                            value={controls.startYear.value} 
                            onChange={handleOnChange} 
                            error={controls.startYear.valid ? undefined: 'Enter a valid start year'} />
            </div>
          </fieldset>

          { /* End */ }
          <fieldset>
            <p><strong>End Date</strong></p>
            <div className="form-row">
              <FormControl  type='select'
                                  title='Month*' 
                                  name='endMonth' 
                                  value={controls.endMonth.value} 
                                  options={Utilities.monthNames.map((name, i) => {
                                    return { name: name, value: i };
                                  })}
                                  onChange={handleOnChange} 
                                  error={controls.endMonth.valid ? undefined: 'Enter a valid end month'} />

              <FormControl  type='number'
                            title='Year*' 
                            name='endYear' 
                            value={controls.endYear.value} 
                            onChange={handleOnChange} 
                            error={controls.endYear.valid ? undefined: 'Enter a valid end year'} />
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