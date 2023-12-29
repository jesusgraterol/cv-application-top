/* eslint-disable no-useless-escape */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Database from '../../services/shared/database/database.service';
import Modal from '../shared/modal/modal.component';
import FormControl from '../shared/form-control/form-control.component';

/**
 * Header Form Component
 * ...
 */
function HeaderForm({ modal, setModal, record, dispatch }) {
  const [ controls, setControls ] = useState({
    avatar: { 
      value: record.general.avatar, 
      valid: true,
      validate: () => true
    },
    name: { 
      value: record.general.name, 
      valid: true, 
      validate: (val) => /^[a-zA-Z ]{2,100}$/.test(val) 
    },
    headline: { 
      value: record.general.headline, 
      valid: true,
      validate: (val) => /^[a-zA-Z \-]{2,100}$/.test(val) 
    },
    email: { 
      value: record.general.email, 
      valid: true,
      validate: (val) => /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(val) 
    },
    phoneNumber: { 
      value: record.general.phoneNumber, 
      valid: true,
      validate: (val) => /^[0-9+]{6,30}$/.test(val) 
    },
    location: { 
      value: record.general.location, 
      valid: true, 
      validate: (val) => /^[a-zA-Z0-9 ,/\.\-_]{2,200}$/.test(val) 
    },
  });
  const [ formValid, setFormValid ] = useState(true);

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

  // file input changes event handler
  const handleOnChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files.length) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setControls({
          ...controls,
          avatar: {
            ...controls.avatar,
            value: e.target.result,
          }
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // form submission event handler
  const handleFormSubmission = (e) => {
    e.preventDefault();
    const newGeneral = {
      avatar: controls.avatar.value || record.general.avatar,
      name: controls.name.value,
      headline: controls.headline.value,
      email: controls.email.value.trim().toLowerCase(),
      phoneNumber: controls.phoneNumber.value,
      location: controls.location.value
    }
    Database.set({ ...record, general: newGeneral });
    dispatch({
      type: 'update_general',
      newGeneral: newGeneral
    });
    setModal(false);
  }


  return (
    <Modal openModal={modal} closeModal={() => setModal(false)}>

      <header>
        <h2>General</h2>
        <button className="icon-btn" aria-label="Close Dialog" onClick={() => setModal(false)}>
          <span aria-hidden="true" className="md-icon">close</span>
        </button>
      </header>

      <article className="form">

        <form noValidate onSubmit={handleFormSubmission}>

          { /* Name */ }
          <div className="form-row">
            <FormControl  title='Name*' 
                          name='name' 
                          value={controls.name.value} 
                          onChange={handleOnChange} 
                          error={controls.name.valid ? undefined: 'Enter a valid name'} />
          </div>

          { /* Headline */ }
          <div className="form-row">
              <FormControl  title='Headline*' 
                            name='headline' 
                            value={controls.headline.value} 
                            onChange={handleOnChange} 
                            error={controls.headline.valid ? undefined: 'Enter a valid headline'} />
          </div>

          { /* Email */ }
          <div className="form-row">
              <FormControl  type='email'
                            title='Email*' 
                            name='email' 
                            value={controls.email.value} 
                            onChange={handleOnChange} 
                            error={controls.email.valid ? undefined: 'Enter a valid email'} />
          </div>

          { /* Phone Number */ }
          <div className="form-row">
              <FormControl  title='Phone Number*' 
                            name='phoneNumber' 
                            value={controls.phoneNumber.value} 
                            onChange={handleOnChange} 
                            error={controls.phoneNumber.valid ? undefined: 'Enter a valid phone number'} />
          </div>

          { /* Location */ }
          <div className="form-row">
              <FormControl  type='textarea'
                            title='Location*' 
                            name='location' 
                            value={controls.location.value} 
                            onChange={handleOnChange} 
                            error={controls.location.valid ? undefined: 'Enter a valid location'} />
          </div>
          
          { /* Avatar */ }
          <div className="form-row">
              <FormControl  type='file'
                            title='Avatar' 
                            name='avatar' 
                            accept="image/*"
                            value={controls.avatar.value} 
                            onChange={handleOnChangeFile} 
                            error={controls.avatar.valid ? undefined: 'Select a valid avatar'} />
          </div>

          <button className="btn primary full-width" type="submit" disabled={!formValid}>
            SUBMIT
          </button>

        </form>

      </article>

    </Modal>
  );
}
HeaderForm.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};




/**
 * Module Exports
 */
export default HeaderForm;