import { useEffect, useRef } from 'react';
import CodeBlock from './CodeBlock';

const LessonContent = ({ content }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Add IDs to headings for table of contents
    const headings = contentRef.current.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => {
      heading.id = `heading-${index}`;
      heading.className = heading.tagName === 'H2' 
        ? 'text-3xl font-bold text-gray-900 mt-12 mb-4 scroll-mt-24'
        : 'text-2xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-24';
    });

    // Style paragraphs
    const paragraphs = contentRef.current.querySelectorAll('p');
    paragraphs.forEach((p) => {
      p.className = 'text-lg text-gray-700 leading-relaxed mb-6';
    });

    // Style lists
    const lists = contentRef.current.querySelectorAll('ul, ol');
    lists.forEach((list) => {
      list.className = 'text-lg text-gray-700 leading-relaxed mb-6 space-y-2';
      if (list.tagName === 'UL') {
        list.className += ' list-disc list-inside';
      } else {
        list.className += ' list-decimal list-inside';
      }
    });

    // Style list items
    const listItems = contentRef.current.querySelectorAll('li');
    listItems.forEach((li) => {
      li.className = 'ml-4';
    });

    // Style links
    const links = contentRef.current.querySelectorAll('a');
    links.forEach((link) => {
      link.className = 'text-blue-600 hover:text-blue-700 underline font-medium';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });

    // Style code blocks
    const codeBlocks = contentRef.current.querySelectorAll('pre');
    codeBlocks.forEach((pre) => {
      const code = pre.querySelector('code');
      if (code) {
        const language = code.className.replace('language-', '') || 'javascript';
        const codeText = code.textContent;
        
        // Replace with CodeBlock component
        const wrapper = document.createElement('div');
        pre.parentNode.replaceChild(wrapper, pre);
        
        // We'll handle this in the parent component instead
        wrapper.setAttribute('data-code', codeText);
        wrapper.setAttribute('data-language', language);
      }
    });

    // Style inline code
    const inlineCodes = contentRef.current.querySelectorAll('code');
    inlineCodes.forEach((code) => {
      if (!code.parentElement.tagName === 'PRE') {
        code.className = 'bg-gray-100 text-pink-600 px-2 py-1 rounded font-mono text-sm';
      }
    });

    // Style blockquotes
    const blockquotes = contentRef.current.querySelectorAll('blockquote');
    blockquotes.forEach((quote) => {
      quote.className = 'border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 rounded-r-lg italic text-gray-700';
    });

    // Style images
    const images = contentRef.current.querySelectorAll('img');
    images.forEach((img) => {
      img.className = 'rounded-2xl shadow-lg my-8 w-full';
    });

  }, [content]);

  // Parse content and replace code blocks
  const parseContent = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;

    const codeBlocks = tempDiv.querySelectorAll('pre code');
    const codeData = [];

    codeBlocks.forEach((code, index) => {
      const language = code.className.replace('language-', '') || 'javascript';
      const codeText = code.textContent;
      codeData.push({ language, code: codeText });
      
      // Replace with placeholder
      const placeholder = document.createElement('div');
      placeholder.setAttribute('data-code-block', index);
      code.parentElement.replaceWith(placeholder);
    });

    return { html: tempDiv.innerHTML, codeBlocks: codeData };
  };

  const { html, codeBlocks } = parseContent();

  return (
    <div className="prose prose-lg max-w-none">
      <div 
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      
      {/* Render code blocks separately */}
      {codeBlocks.map((block, index) => (
        <div key={index}>
          <CodeBlock code={block.code} language={block.language} />
        </div>
      ))}
    </div>
  );
};

export default LessonContent;
