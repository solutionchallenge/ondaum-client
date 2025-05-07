import Modal from "../../../../commons/feedback/Modal";

export default function MeditationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <div >
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Daily Meditation Practice</h2>

      <div className="flex items-center text-sm text-gray-600 mb-2">
        <svg className="w-4 h-4 text-orange-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 9H9V6h2v5zm0 2H9v-2h2v2z" />
        </svg>
        10 minutes
      </div>

      <p className="text-sm text-gray-700 mb-3">
        Practice mindful meditation when feeling anxious. Find a quiet space, sit comfortably, and focus on your breath.
      </p>

      <div className="flex items-center text-sm font-medium text-gray-700 mb-4">
        <svg className="w-4 h-4 text-orange-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 2h16v16H2V2zm2 2v12h12V4H4zm4 3h4v2H8V7zm0 4h4v2H8v-2z" />
        </svg>
        Anxiety Relief
      </div>

      <button className="flex items-center justify-center w-full py-2 rounded-lg bg-orange-400 text-white font-semibold">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 4l10 6-10 6V4z" />
        </svg>
        Start Meditation
      </button>
    </div>
    </Modal>
  );
}
