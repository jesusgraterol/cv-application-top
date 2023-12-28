import { useState } from 'react';
import PropTypes from 'prop-types';
import Database from '../../services/shared/database/database.service';
import Modal from '../shared/modal/modal.component';

/**
 * About Form Component
 * ...
 */
function AboutForm({ modal, setModal, record, dispatch }) {
  const [ bio, setBio ] = useState(record.bio);
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
        <h2>About</h2>
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

        </form>

      </article>

    </Modal>
  );
}
AboutForm.propTypes = {
  modal: PropTypes.bool.isRequired,
  setModal: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};




/**
 * Module Exports
 */
export default AboutForm;