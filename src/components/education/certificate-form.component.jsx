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
      value: cert ? cert.title : '', 
      valid: cert !== undefined, 
      pristine: true,
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{6,200}$/.test(val) 
    },
    issuer: { 
      value: cert ? cert.issuer : '', 
      valid: cert !== undefined, 
      pristine: true,
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{4,200}$/.test(val) 
    },
    startMonth: { 
      value: cert ? String(cert.start.month) : '', 
      valid: cert !== undefined, 
      pristine: true,
      validate: (val) => val.length > 0
    },
    startYear: { 
      value: cert ? String(cert.start.year) : '', 
      valid: cert !== undefined, 
      pristine: true,
      validate: (val) => {
        const newVal = Number(val)
        return Number.isInteger(newVal) && newVal >= 1980 && newVal <= currentYear
      }
    },
    endMonth: { 
      value: cert && cert.end ? String(cert.end.month) : '', 
      valid: true, 
      pristine: true,
      validate: () => true
    },
    endYear: { 
      value: cert && cert.end ? String(cert.end.year) : '', 
      valid: true, 
      pristine: true,
      validate: (val) => {
        if (!val.length) {
          return true;
        }
        const newVal = Number(val);
        return Number.isInteger(newVal) && newVal >= 1980 && newVal <= currentYear;
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
        valid: controls[e.target.name].validate(e.target.value),
        pristine: false,
      }
    };
    setControls(nextControls);
    setFormValid(Object.values(nextControls).every((control) => control.valid));
  }

  // changes broadcaster
  const broadcastChanges = (nextCertificates) => {
    Database.set({ ...record, education: nextCertificates });
    dispatch({
      type: 'certificates_changed',
      newCertificates: nextCertificates
    });
    setModal(false);
  }

  // form submission event handler
  const handleFormSubmission = (e) => {
    e.preventDefault();

    // handle the action based on the certificate being created or updated
    let nextCertificates;
    if (cert === undefined) {
      nextCertificates = record.education.concat([{
        id: Utilities.generateUUID(),
        title: controls.title.value,
        issuer: controls.issuer.value,
        start: { month: Number(controls.startMonth.value), year: Number(controls.startYear.value) },
        end: controls.endMonth.value.length && controls.endYear.value.length 
          ? { month: Number(controls.endMonth.value), year: Number(controls.endYear.value) } 
          : undefined,
      }]);
    } else {
      nextCertificates = record.education.map((item) => {
        if (item.id === itemID) {
          return {
            ...item,
            title: controls.title.value,
            issuer: controls.issuer.value,
            start: { month: Number(controls.startMonth.value), year: Number(controls.startYear.value) },
            end: controls.endMonth.value.length && controls.endYear.value.length 
              ? { month: Number(controls.endMonth.value), year: Number(controls.endYear.value) } 
              : undefined,
          }
        }
        return item;
      });
    }

    // sort the items by date descending
    nextCertificates = Utilities.sortListItemsByTimestamp(nextCertificates);

    // broadcast the changes
    broadcastChanges(nextCertificates);
  }

  // delete item event handler
  const handleDeleteButtonClick = () => {
    broadcastChanges(record.education.filter((item) => item.id !== itemID));
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
                            error={controls.title.pristine || controls.title.valid ? undefined: 'Enter a valid title'} />
          </div>

          { /* Issuer */ }
          <div className="form-row">
              <FormControl  title='Issuer*' 
                            name='issuer' 
                            value={controls.issuer.value} 
                            onChange={handleOnChange} 
                            error={controls.issuer.pristine || controls.issuer.valid ? undefined: 'Enter a valid issuer'} />
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
                                error={controls.startMonth.pristine || controls.startMonth.valid ? undefined: 'Enter a valid start month'} />

              <FormControl  type='number'
                            title='Year*' 
                            name='startYear' 
                            value={controls.startYear.value} 
                            onChange={handleOnChange} 
                            error={controls.startYear.pristine || controls.startYear.valid ? undefined: 'Enter a valid start year'} />
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
                                  error={controls.endMonth.pristine || controls.endMonth.valid ? undefined: 'Enter a valid end month'} />

              <FormControl  type='number'
                            title='Year*' 
                            name='endYear' 
                            value={controls.endYear.value} 
                            onChange={handleOnChange} 
                            error={controls.endYear.pristine || controls.endYear.valid ? undefined: 'Enter a valid end year'} />
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