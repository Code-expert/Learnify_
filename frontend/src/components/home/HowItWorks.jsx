import { FiCheckCircle, FiBook, FiCode, FiTrendingUp } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: FiCheckCircle,
      title: 'Choose Your Path',
      description: 'Browse our curated topics and pick what you want to master',
      gradient: 'from-blue-500 to-cyan-500',
      delay: '0',
    },
    {
      icon: FiBook,
      title: 'Learn Step-by-Step',
      description: 'Follow comprehensive tutorials with real code examples',
      gradient: 'from-purple-500 to-pink-500',
      delay: '200',
    },
    {
      icon: FiCode,
      title: 'Practice & Build',
      description: 'Apply your knowledge by building real-world projects',
      gradient: 'from-orange-500 to-red-500',
      delay: '400',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full mb-4">
            <FiTrendingUp className="text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">
              Simple Process
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            How It{' '}
            <span className="gradient-text bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to become a web development expert
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative animate-fadeIn"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="text-center">
                {/* Number Badge */}
                <div className="relative inline-block mb-6">
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r ${step.gradient} rounded-full blur-lg opacity-30`}
                  />
                  <div className="relative w-20 h-20 mx-auto rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center">
                    <step.icon
                      className={`text-3xl bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                    />
                  </div>
                  <div
                    className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center text-white font-bold shadow-lg`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
