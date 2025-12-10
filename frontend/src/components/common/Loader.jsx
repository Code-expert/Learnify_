const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className={`${sizes[size]} rounded-full border-4 border-gray-200`}></div>
        <div className={`${sizes[size]} rounded-full border-4 border-t-primary-600 border-r-secondary-600 animate-spin absolute top-0`}></div>
      </div>
    </div>
  );
};

export default Loader;
