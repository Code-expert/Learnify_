import { FiAlertCircle } from 'react-icons/fi';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
      <FiAlertCircle className="text-red-500" size={20} />
      <p className="text-red-700">{message}</p>
    </div>
  );
};

export default ErrorMessage;
