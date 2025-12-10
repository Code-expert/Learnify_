import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap } from 'react-icons/fi';

const CTASection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-float"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 mb-8 animate-float">
          <FiZap className="text-4xl text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          Ready to Start Your
          <br />
          <span className="text-yellow-300">Coding Journey?</span>
        </h2>

        {/* Description */}
        <p className="text-xl sm:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of developers mastering web development with our free, comprehensive tutorials
        </p>

        {/* CTA Button */}
        <Link
          to="/topics"
          className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-purple-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 group"
        >
          <span>Start Learning Now</span>
          <FiArrowRight className="text-2xl group-hover:translate-x-2 transition-transform" />
        </Link>

        {/* Subtext */}
        <p className="mt-6 text-white/70 text-sm">
          No credit card required • 100% Free Forever
        </p>
      </div>
    </section>
  );
};

export default CTASection;
