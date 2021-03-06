import React from 'react';
import styles from './Modal.css';
import PropTypes from 'prop-types';

const Modal = ({ modalInstructions, showModal, toggleModal, children }) => {

  return (
    <section>
      <div className={`${styles.Modal} ${showModal ? styles.modalShow : styles.modalHide}`}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} type='button' onClick={toggleModal}>&times;</button>
          <div>{modalInstructions}</div>
          { children }
        </div>
      </div>
    </section>
  );
};

Modal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  modalInstructions: PropTypes.object.isRequired,
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Modal;

// Add this code wherever you want the modal-opening button to live...
// import { useModal } from '../../hooks/useModal';
// const [show<MODAL_NAME>Modal, toggle[show<MODAL_NAME>Modal] = useModal();
// In the return...
{/* <Modal showModal={show<MODAL_NAME>Modal} toggleModal={toggle<MODAL_NAME>Modal} /> */}
// <button className={styles.modalButton} type='button' onClick={() => toggle<MODAL_NAME>Modal()}> ? </button>

