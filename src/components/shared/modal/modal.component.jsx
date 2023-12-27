import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Header Component
 * ...
 */
function Modal({ openModal, closeModal, children }) {
  const ref = useRef();
  
  useEffect(() => {
    if (openModal) {
      ref.current.showModal();
    } else {
      ref.current.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      onClose={closeModal}
    >
      {children}
      <button onClick={closeModal}>
        Close
      </button>
    </dialog>
  );
}
Modal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};



/**
 * Module Exports
 */
export default Modal;