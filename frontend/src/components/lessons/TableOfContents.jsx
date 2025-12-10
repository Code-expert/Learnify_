import { useEffect, useState } from 'react';
import { FiList } from 'react-icons/fi';

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Extract headings from content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const h2Elements = tempDiv.querySelectorAll('h2, h3');
    
    const extractedHeadings = Array.from(h2Elements).map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.textContent,
      level: heading.tagName.toLowerCase(),
    }));

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    // Scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 glass rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
          <FiList className="text-white" />
        </div>
        <h3 className="font-bold text-gray-900">On This Page</h3>
      </div>

      <nav className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => scrollToHeading(heading.id)}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
              activeId === heading.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            } ${heading.level === 'h3' ? 'pl-6' : ''}`}
          >
            {heading.text}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
