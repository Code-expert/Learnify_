const Card = ({ children, className = '', hover = true, gradient = false }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-6 ${
        hover ? 'card-hover cursor-pointer' : ''
      } ${
        gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
