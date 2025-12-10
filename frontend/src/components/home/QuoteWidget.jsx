import { useState, useEffect } from 'react';
import { FiRefreshCw, FiMessageCircle } from 'react-icons/fi'; // Changed FiQuote to FiMessageCircle
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'; // Add this for quote icons

const QuoteWidget = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuote = async () => {
    try {
      setRefreshing(true);
      const response = await fetch(
        'https://api.quotable.io/random?tags=technology|famous-quotes&maxLength=150'
      );
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author,
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        text: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-500" />

          {/* Card */}
          <div className="relative glass rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <BiSolidQuoteAltLeft className="absolute top-4 left-4 text-9xl text-purple-600 transform -rotate-12" />
              <BiSolidQuoteAltRight className="absolute bottom-4 right-4 text-9xl text-pink-600 transform rotate-12" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <FiMessageCircle className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Quote of the Day
                    </h3>
                    <p className="text-sm text-gray-500">Inspiration for developers</p>
                  </div>
                </div>

                <button
                  onClick={fetchQuote}
                  disabled={refreshing}
                  className="p-3 rounded-xl bg-white/50 hover:bg-white/80 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  aria-label="Refresh quote"
                >
                  <FiRefreshCw
                    className={`text-purple-600 text-xl ${
                      refreshing ? 'animate-spin' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Quote */}
              {loading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-full" />
                  <div className="h-6 bg-gray-200 rounded w-2/3" />
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <blockquote className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-relaxed mb-6 italic">
                    "{quote?.text}"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                    <cite className="text-lg font-medium text-gray-600 not-italic">
                      — {quote?.author}
                    </cite>
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteWidget;
