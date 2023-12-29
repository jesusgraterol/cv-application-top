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
 * Position Form Component
 * ...
 */
function PositionForm({ modal, setModal, record, dispatch, itemID }) {
  // init the certificate if an id was provided
  const pos = record.experience.find((pos) => pos.id === itemID);

  // init the form controls
  const [ controls, setControls ] = useState({
    title: { 
      value: pos ? pos.title : '', 
      valid: pos !== undefined, 
      pristine: true,
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{6,200}$/.test(val) 
    },
    employeer: { 
      value: pos ? pos.employeer : '', 
      valid: pos !== undefined, 
      pristine: true,
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{4,200}$/.test(val) 
    },
    responsibilities: { 
      value: pos ? pos.responsibilities : '', 
      valid: pos !== undefined, 
      pristine: true,
      validate: (val) => val.length >= 5
    },
    startMonth: { 
      value: pos ? String(pos.start.month) : '', 
      valid: pos !== undefined, 
      pristine: true,
      validate: (val) => val.length > 0
    },
    startYear: { 
      value: pos ? String(pos.start.year) : '', 
      valid: pos !== undefined, 
      pristine: true,
      validate: (val) => {
        const newVal = Number(val)
        return Number.isInteger(newVal) && newVal >= 1980 && newVal <= currentYear
      }
    },
    endMonth: { 
      value: pos && pos.end ? String(pos.end.month) : '', 
      valid: true, 
      pristine: true,
      validate: () => true
    },
    endYear: { 
      value: pos && pos.end ? String(pos.end.year) : '', 
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
  const [ formValid, setFormValid ] = useState(pos !== undefined);

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
  const broadcastChanges = (nextPositions) => {
    Database.set({ ...record, experience: nextPositions });
    dispatch({
      type: 'positions_changed',
      newPositions: nextPositions
    });
    setModal(false);
  }

  // form submission event handler
  const handleFormSubmission = (e) => {
    e.preventDefault();

    // handle the action based on the certificate being created or updated
    let nextPositions;
    if (pos === undefined) {
      nextPositions = record.experience.concat([{
        id: Utilities.generateUUID(),
        title: controls.title.value,
        employeer: controls.employeer.value,
        responsibilities: controls.responsibilities.value,
        start: { month: Number(controls.startMonth.value), year: Number(controls.startYear.value) },
        end: controls.endMonth.value.length && controls.endYear.value.length 
          ? { month: Number(controls.endMonth.value), year: Number(controls.endYear.value) } 
          : undefined,
      }]);
    } else {
      nextPositions = record.experience.map((item) => {
        if (item.id === itemID) {
          return {
            ...item,
            title: controls.title.value,
            employeer: controls.employeer.value,
            responsibilities: controls.responsibilities.value,
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
    nextPositions = Utilities.sortListItemsByTimestamp(nextPositions);

    // broadcast the changes
    broadcastChanges(nextPositions);
  }

  // delete item event handler
  const handleDeleteButtonClick = () => {
    broadcastChanges(record.experience.filter((item) => item.id !== itemID));
  }

  return (
    <Modal openModal={modal} closeModal={() => setModal(false)}>

      <header>
        <h2>Position</h2>
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

          { /* Employeer */ }
          <div className="form-row">
              <FormControl  title='Employeer*' 
                            name='employeer' 
                            value={controls.employeer.value} 
                            onChange={handleOnChange} 
                            error={controls.employeer.pristine || controls.employeer.valid ? undefined: 'Enter a valid employeer'} />
          </div>

          { /* Responsibilities */ }
          <div className="form-row">
              <FormControl  type='textarea'
                            title='Responsibilities separated by commas (,)*' 
                            placeholder="Responsibility 1,Responsibility 2,Responsibility 3"
                            name='responsibilities' 
                            value={controls.responsibilities.value} 
                            onChange={handleOnChange} 
                            error={controls.responsibilities.pristine || controls.responsibilities.valid ? undefined: 'Enter a valid list of responsibilities'} />
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
PositionForm.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  itemID: PropTypes.string,
};




/**
 * Module Exports
 */
export default PositionForm;