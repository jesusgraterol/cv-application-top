/* eslint-disable no-useless-escape */
import { useState } from 'react';
import PropTypes from 'prop-types';
import Database from '../../services/shared/database/database.service';
import Modal from '../shared/modal/modal.component';

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
              <div className="form-control">
                  <label htmlFor="name">Name*
                      <input  type="text" 
                              name="name" 
                              id="name" 
                              value={controls.name.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.name.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid name
                  </p>
              </div>
          </div>

          { /* Headline */ }
          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="headline">Headline*
                      <input  type="text" 
                              name="headline" 
                              id="headline" 
                              value={controls.headline.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.headline.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid headline
                  </p>
              </div>
          </div>

          { /* Email */ }
          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="email">Email*
                      <input  type="email" 
                              name="email" 
                              id="email" 
                              value={controls.email.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.email.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid email
                  </p>
              </div>
          </div>

          { /* Phone Number */ }
          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="phoneNumber">Phone Number*
                      <input  type="text" 
                              name="phoneNumber" 
                              id="phoneNumber" 
                              value={controls.phoneNumber.value} 
                              onChange={(e) => handleOnChange(e)}  />
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.phoneNumber.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid phone number
                  </p>
              </div>
          </div>

          { /* Location */ }
          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="location">Location*
                      <textarea id="location" 
                                name="location" 
                                onChange={(e) => handleOnChange(e)} 
                                value={controls.location.value}></textarea>
                  </label>
                  <p  className="error" 
                      style={{ visibility: controls.location.valid ? 'hidden': 'visible' }}>
                      <span className="md-icon">error</span> Enter a valid location
                  </p>
              </div>
          </div>
          
          { /* Avatar */ }
          <div className="form-row">
              <div className="form-control">
                  <label htmlFor="avatar">Avatar</label>
                  <input  type="file" 
                          id="avatar" 
                          name="avatar" 
                          accept="image/*"
                          onChange={(e) => handleOnChangeFile(e)}  />
              </div>
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