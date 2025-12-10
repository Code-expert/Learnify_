import { useEffect, useState } from 'react';
import { FiBook, FiUsers, FiAward, FiTrendingUp } from 'react-icons/fi';

const StatsSection = () => {
  const [counts, setCounts] = useState({
    topics: 0,
    lessons: 0,
    users: 0,
    completion: 0,
  });

  useEffect(() => {
    // Animated counter
    const targets = { topics: 4, lessons: 20, users: 500, completion: 95 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const timer = setInterval(() => {
      setCounts((prev) => {
        const newCounts = {};
        let allReached = true;

        Object.keys(targets).forEach((key) => {
          if (prev[key] < targets[key]) {
            newCounts[key] = Math.min(
              prev[key] + Math.ceil(targets[key] / steps),
              targets[key]
            );
            allReached = false;
          } else {
            newCounts[key] = targets[key];
          }
        });

        if (allReached) clearInterval(timer);
        return newCounts;
      });
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: FiBook,
      value: counts.topics,
      label: 'Topics',
      suffix: '+',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiTrendingUp,
      value: counts.lessons,
      label: 'Lessons',
      suffix: '+',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiUsers,
      value: counts.users,
      label: 'Learners',
      suffix: '+',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FiAward,
      value: counts.completion,
      label: 'Success Rate',
      suffix: '%',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative inline-block mb-4">
                <div
                  className={`absolute -inset-3 bg-gradient-to-r ${stat.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500`}
                />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <stat.icon className="text-3xl sm:text-4xl text-white" />
                </div>
              </div>

              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-gray-300 text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

