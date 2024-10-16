const SuccessModal = ({ closeModal }: { closeModal: () => void }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8 w-96 text-center">
          <div className="text-5xl text-orange-500 mb-4">✔️</div>
          <h2 className="text-2xl font-semibold mb-4">Nurse Registered successfully</h2>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-orange-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  };
  
  export default SuccessModal;
  