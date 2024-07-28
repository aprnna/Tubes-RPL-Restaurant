'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, children }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div 
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <motion.div 
            animate={{ y: 0 }}
            className=" relative bg-white rounded-lg shadow-lg p-6 max-h-screen"
            exit={{ y: 100 }}
            initial={{ y: -100 }}
          >
            <button 
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
                x
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default Modal;
