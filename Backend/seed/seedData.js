import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors'; // Optional: for colored console output
import User from '../models/User.js';
import Topic from '../models/Topic.js';
import Lesson from '../models/Lesson.js';

// Load env vars
dotenv.config();

// Connect to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected'.green.bold);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Sample Users
const users = [
  {
    name: 'Admin User',
    email: 'admin@learnify.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Demo User',
    email: 'user@learnify.com',
    password: 'user123',
    role: 'user'
  }
];

// Sample Topics
const topics = [
  {
    title: 'HTML Tutorial',
    slug: 'html-tutorial',
    description: 'Learn HTML from basics to advanced concepts. Master the foundation of web development with comprehensive HTML tutorials.',
    icon: '📄',
    color: '#e34c26',
    order: 1,
    isPublished: true
  },
  {
    title: 'CSS Tutorial',
    slug: 'css-tutorial',
    description: 'Style your websites with CSS. Learn layouts, animations, flexbox, grid, and modern CSS techniques.',
    icon: '🎨',
    color: '#264de4',
    order: 2,
    isPublished: true
  },
  {
    title: 'JavaScript Tutorial',
    slug: 'javascript-tutorial',
    description: 'Make your websites interactive with JavaScript. Learn programming fundamentals and modern ES6+ features.',
    icon: '⚡',
    color: '#f0db4f',
    order: 3,
    isPublished: true
  },
  {
    title: 'React Tutorial',
    slug: 'react-tutorial',
    description: 'Build modern web applications with React. Learn components, hooks, state management, and more.',
    icon: '⚛️',
    color: '#61dafb',
    order: 4,
    isPublished: true
  }
];

// Sample Lessons (will be linked to topics after creation)
const lessons = {
  'html-tutorial': [
    {
      title: 'HTML Introduction',
      slug: 'html-introduction',
      level: 'beginner',
      content: `<h2>What is HTML?</h2>
<p>HTML stands for <strong>HyperText Markup Language</strong>. It is the standard markup language for creating web pages and web applications.</p>
<p>HTML describes the structure of a web page using markup. HTML elements are represented by tags, which label pieces of content such as "heading," "paragraph," "table," and so on.</p>
<h3>Key Points:</h3>
<ul>
  <li>HTML is not a programming language; it's a markup language</li>
  <li>It uses tags to structure content</li>
  <li>Browsers interpret HTML to display web pages</li>
  <li>HTML5 is the latest version</li>
</ul>`,
      sampleCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World!</h1>
  <p>This is my first HTML page.</p>
</body>
</html>`,
      order: 1,
      isPublished: true
    },
    {
      title: 'HTML Basic Structure',
      slug: 'html-basic-structure',
      level: 'beginner',
      content: `<h2>HTML Document Structure</h2>
<p>Every HTML document follows a basic structure. Let's break down the essential components:</p>
<h3>DOCTYPE Declaration</h3>
<p>The <code>&lt;!DOCTYPE html&gt;</code> declaration tells the browser that this is an HTML5 document.</p>
<h3>HTML Element</h3>
<p>The <code>&lt;html&gt;</code> element is the root element that contains all other elements.</p>
<h3>Head Section</h3>
<p>The <code>&lt;head&gt;</code> contains metadata, title, and links to external resources like CSS files.</p>
<h3>Body Section</h3>
<p>The <code>&lt;body&gt;</code> contains all the visible content of the web page.</p>`,
      sampleCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
</head>
<body>
  <!-- Your content goes here -->
  <h1>Welcome</h1>
</body>
</html>`,
      order: 2,
      isPublished: true
    },
    {
      title: 'HTML Headings and Paragraphs',
      slug: 'html-headings-paragraphs',
      level: 'beginner',
      content: `<h2>Headings in HTML</h2>
<p>HTML provides six levels of headings, from <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>. <code>&lt;h1&gt;</code> is the most important (largest) and <code>&lt;h6&gt;</code> is the least important (smallest).</p>
<h3>Best Practices:</h3>
<ul>
  <li>Use only one <code>&lt;h1&gt;</code> per page</li>
  <li>Don't skip heading levels</li>
  <li>Use headings for structure, not styling</li>
</ul>
<h2>Paragraphs</h2>
<p>The <code>&lt;p&gt;</code> tag defines a paragraph. Browsers automatically add space before and after paragraphs.</p>`,
      sampleCode: `<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>

<p>This is a paragraph of text. It can contain multiple sentences and will automatically wrap to fit the container width.</p>

<p>This is another paragraph. HTML ignores    multiple    spaces    and
line breaks in your code.</p>`,
      order: 3,
      isPublished: true
    },
    {
      title: 'HTML Links and Images',
      slug: 'html-links-images',
      level: 'beginner',
      content: `<h2>Creating Links</h2>
<p>The <code>&lt;a&gt;</code> (anchor) tag is used to create hyperlinks. The <code>href</code> attribute specifies the destination URL.</p>
<h3>Link Attributes:</h3>
<ul>
  <li><code>href</code> - The URL destination</li>
  <li><code>target="_blank"</code> - Opens in a new tab</li>
  <li><code>title</code> - Tooltip text on hover</li>
</ul>
<h2>Adding Images</h2>
<p>The <code>&lt;img&gt;</code> tag is used to embed images. It's a self-closing tag with important attributes.</p>
<h3>Image Attributes:</h3>
<ul>
  <li><code>src</code> - Image source URL (required)</li>
  <li><code>alt</code> - Alternative text for accessibility (required)</li>
  <li><code>width</code> and <code>height</code> - Dimensions</li>
</ul>`,
      sampleCode: `<!-- Links -->
<a href="https://www.example.com">Visit Example</a>
<a href="https://www.example.com" target="_blank">Open in New Tab</a>
<a href="mailto:email@example.com">Send Email</a>

<!-- Images -->
<img src="image.jpg" alt="Description of image">
<img src="logo.png" alt="Company Logo" width="200" height="100">`,
      order: 4,
      isPublished: true
    },
    {
      title: 'HTML Lists',
      slug: 'html-lists',
      level: 'beginner',
      content: `<h2>Types of Lists</h2>
<p>HTML provides three types of lists for organizing content:</p>
<h3>Unordered Lists</h3>
<p>Use <code>&lt;ul&gt;</code> for bullet-point lists where order doesn't matter.</p>
<h3>Ordered Lists</h3>
<p>Use <code>&lt;ol&gt;</code> for numbered lists where sequence is important.</p>
<h3>Description Lists</h3>
<p>Use <code>&lt;dl&gt;</code> for term-definition pairs.</p>`,
      sampleCode: `<!-- Unordered List -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Ordered List -->
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>

<!-- Description List -->
<dl>
  <dt>HTML</dt>
  <dd>Markup language for web pages</dd>
  <dt>CSS</dt>
  <dd>Stylesheet language for design</dd>
</dl>`,
      order: 5,
      isPublished: true
    }
  ],
  'css-tutorial': [
    {
      title: 'CSS Introduction',
      slug: 'css-introduction',
      level: 'beginner',
      content: `<h2>What is CSS?</h2>
<p><strong>CSS (Cascading Style Sheets)</strong> is used to style and layout web pages. It controls colors, fonts, spacing, positioning, and responsive design.</p>
<h3>Why Use CSS?</h3>
<ul>
  <li>Separates content (HTML) from presentation (CSS)</li>
  <li>Makes websites visually appealing</li>
  <li>Enables responsive design</li>
  <li>Improves website performance and maintainability</li>
</ul>
<h3>Three Ways to Add CSS:</h3>
<ul>
  <li><strong>Inline:</strong> Using the style attribute</li>
  <li><strong>Internal:</strong> Using &lt;style&gt; tag in &lt;head&gt;</li>
  <li><strong>External:</strong> Linking to a .css file (recommended)</li>
</ul>`,
      sampleCode: `/* External CSS file (styles.css) */
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  line-height: 1.6;
  color: #666;
}`,
      order: 1,
      isPublished: true
    },
    {
      title: 'CSS Selectors',
      slug: 'css-selectors',
      level: 'beginner',
      content: `<h2>Understanding CSS Selectors</h2>
<p>Selectors are patterns used to select the HTML elements you want to style.</p>
<h3>Common Selectors:</h3>
<ul>
  <li><strong>Element Selector:</strong> Targets all elements of a type</li>
  <li><strong>Class Selector:</strong> Targets elements with a specific class (.classname)</li>
  <li><strong>ID Selector:</strong> Targets a unique element (#idname)</li>
  <li><strong>Universal Selector:</strong> Targets all elements (*)</li>
</ul>`,
      sampleCode: `/* Element Selector */
p {
  color: blue;
}

/* Class Selector */
.highlight {
  background-color: yellow;
}

/* ID Selector */
#header {
  font-size: 24px;
}

/* Combining Selectors */
div.container p {
  margin: 10px;
}`,
      order: 2,
      isPublished: true
    },
    {
      title: 'CSS Colors and Backgrounds',
      slug: 'css-colors-backgrounds',
      level: 'beginner',
      content: `<h2>Working with Colors</h2>
<p>CSS provides multiple ways to specify colors:</p>
<ul>
  <li><strong>Named colors:</strong> red, blue, green</li>
  <li><strong>Hex codes:</strong> #ff0000, #00ff00</li>
  <li><strong>RGB:</strong> rgb(255, 0, 0)</li>
  <li><strong>RGBA:</strong> rgba(255, 0, 0, 0.5) - with transparency</li>
  <li><strong>HSL:</strong> hsl(0, 100%, 50%)</li>
</ul>
<h2>Background Properties</h2>
<p>CSS offers rich background styling options including colors, images, gradients, and positioning.</p>`,
      sampleCode: `/* Color Examples */
.red-text {
  color: #ff0000;
}

.transparent-bg {
  background-color: rgba(0, 0, 255, 0.3);
}

/* Background Image */
.hero {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Gradient Background */
.gradient {
  background: linear-gradient(to right, #667eea, #764ba2);
}`,
      order: 3,
      isPublished: true
    },
    {
      title: 'CSS Box Model',
      slug: 'css-box-model',
      level: 'intermediate',
      content: `<h2>Understanding the Box Model</h2>
<p>Every HTML element is essentially a box. The CSS box model consists of four areas:</p>
<ol>
  <li><strong>Content:</strong> The actual content (text, images)</li>
  <li><strong>Padding:</strong> Space between content and border</li>
  <li><strong>Border:</strong> A line around the padding</li>
  <li><strong>Margin:</strong> Space outside the border</li>
</ol>
<h3>Box-Sizing Property:</h3>
<p>The <code>box-sizing</code> property controls how total width/height is calculated.</p>`,
      sampleCode: `/* Default box model */
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  /* Total width = 300 + 40 + 10 = 350px */
}

/* Border-box (recommended) */
.box-border {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 300px (includes padding & border) */
}`,
      order: 4,
      isPublished: true
    },
    {
      title: 'CSS Flexbox',
      slug: 'css-flexbox',
      level: 'intermediate',
      content: `<h2>Introduction to Flexbox</h2>
<p>Flexbox is a one-dimensional layout method for arranging items in rows or columns. It makes responsive layouts much easier.</p>
<h3>Key Concepts:</h3>
<ul>
  <li><strong>Flex Container:</strong> Parent element with <code>display: flex</code></li>
  <li><strong>Flex Items:</strong> Direct children of the container</li>
  <li><strong>Main Axis:</strong> Primary direction (row or column)</li>
  <li><strong>Cross Axis:</strong> Perpendicular to main axis</li>
</ul>`,
      sampleCode: `/* Flex Container */
.container {
  display: flex;
  justify-content: space-between; /* Align horizontally */
  align-items: center; /* Align vertically */
  gap: 20px; /* Space between items */
}

/* Flex Items */
.item {
  flex: 1; /* Grow equally */
}

/* Responsive Row to Column */
.responsive {
  display: flex;
  flex-direction: row;
}

@media (max-width: 768px) {
  .responsive {
    flex-direction: column;
  }
}`,
      order: 5,
      isPublished: true
    }
  ],
  'javascript-tutorial': [
    {
      title: 'JavaScript Introduction',
      slug: 'javascript-introduction',
      level: 'beginner',
      content: `<h2>What is JavaScript?</h2>
<p><strong>JavaScript</strong> is a programming language that enables interactive web pages. It's an essential part of web development alongside HTML and CSS.</p>
<h3>What Can JavaScript Do?</h3>
<ul>
  <li>Change HTML content and attributes</li>
  <li>Change CSS styles dynamically</li>
  <li>Validate form data</li>
  <li>Create animations and effects</li>
  <li>Handle user events (clicks, hovers, etc.)</li>
  <li>Make HTTP requests (AJAX)</li>
  <li>Store data locally</li>
</ul>
<h3>Where to Write JavaScript:</h3>
<ul>
  <li>Inline: In HTML event attributes</li>
  <li>Internal: Inside &lt;script&gt; tags</li>
  <li>External: In separate .js files (recommended)</li>
</ul>`,
      sampleCode: `// Output to console
console.log('Hello, World!');

// Display alert
alert('Welcome to JavaScript!');

// Change HTML content
document.getElementById('demo').innerHTML = 'Hello JavaScript!';

// Perform calculations
let x = 5;
let y = 10;
let sum = x + y;
console.log('Sum:', sum);`,
      order: 1,
      isPublished: true
    },
    {
      title: 'JavaScript Variables',
      slug: 'javascript-variables',
      level: 'beginner',
      content: `<h2>Variables in JavaScript</h2>
<p>Variables are containers for storing data values. JavaScript has three ways to declare variables:</p>
<h3>var (old way - avoid)</h3>
<p>Function-scoped, can be redeclared and updated.</p>
<h3>let (modern - recommended)</h3>
<p>Block-scoped, can be updated but not redeclared in the same scope.</p>
<h3>const (modern - for constants)</h3>
<p>Block-scoped, cannot be updated or redeclared. Use for values that won't change.</p>
<h3>Naming Rules:</h3>
<ul>
  <li>Must start with a letter, $, or _</li>
  <li>Can contain letters, numbers, $, and _</li>
  <li>Case-sensitive (myVar ≠ myvar)</li>
  <li>Cannot use reserved keywords</li>
</ul>`,
      sampleCode: `// Using let (can change)
let name = 'John';
let age = 25;
age = 26; // ✓ OK

// Using const (cannot change)
const PI = 3.14159;
const API_KEY = 'abc123';
// PI = 3.14; // ✗ Error!

// Multiple declarations
let x = 5, y = 10, z = 15;

// Data types
let string = 'Hello';
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { name: 'John', age: 25 };`,
      order: 2,
      isPublished: true
    },
    {
      title: 'JavaScript Functions',
      slug: 'javascript-functions',
      level: 'beginner',
      content: `<h2>Functions in JavaScript</h2>
<p>Functions are reusable blocks of code designed to perform specific tasks.</p>
<h3>Why Use Functions?</h3>
<ul>
  <li>Reuse code: Write once, use many times</li>
  <li>Organize code: Break complex problems into smaller pieces</li>
  <li>Make code readable and maintainable</li>
</ul>
<h3>Types of Functions:</h3>
<ul>
  <li><strong>Function Declaration:</strong> Traditional way</li>
  <li><strong>Function Expression:</strong> Assign to a variable</li>
  <li><strong>Arrow Function:</strong> Modern ES6 syntax</li>
</ul>`,
      sampleCode: `// Function Declaration
function greet(name) {
  return 'Hello, ' + name + '!';
}

// Function Expression
const add = function(a, b) {
  return a + b;
};

// Arrow Function (ES6)
const multiply = (a, b) => a * b;

// Using functions
console.log(greet('Alice')); // Hello, Alice!
console.log(add(5, 3)); // 8
console.log(multiply(4, 5)); // 20

// Function with default parameters
const welcome = (name = 'Guest') => {
  return \`Welcome, \${name}!\`;
};`,
      order: 3,
      isPublished: true
    },
    {
      title: 'JavaScript Arrays',
      slug: 'javascript-arrays',
      level: 'beginner',
      content: `<h2>Working with Arrays</h2>
<p>Arrays are special variables that can hold multiple values in a single variable.</p>
<h3>Common Array Methods:</h3>
<ul>
  <li><code>push()</code> - Add to end</li>
  <li><code>pop()</code> - Remove from end</li>
  <li><code>shift()</code> - Remove from beginning</li>
  <li><code>unshift()</code> - Add to beginning</li>
  <li><code>map()</code> - Transform each element</li>
  <li><code>filter()</code> - Filter elements</li>
  <li><code>find()</code> - Find single element</li>
  <li><code>forEach()</code> - Loop through elements</li>
</ul>`,
      sampleCode: `// Creating arrays
const fruits = ['Apple', 'Banana', 'Orange'];
const numbers = [1, 2, 3, 4, 5];

// Accessing elements
console.log(fruits[0]); // Apple

// Adding elements
fruits.push('Mango'); // Add to end
fruits.unshift('Grapes'); // Add to beginning

// Array methods
const doubled = numbers.map(num => num * 2);
// [2, 4, 6, 8, 10]

const evens = numbers.filter(num => num % 2 === 0);
// [2, 4]

// Looping
fruits.forEach(fruit => {
  console.log(fruit);
});`,
      order: 4,
      isPublished: true
    },
    {
      title: 'JavaScript Objects',
      slug: 'javascript-objects',
      level: 'intermediate',
      content: `<h2>Understanding Objects</h2>
<p>Objects are collections of key-value pairs. They're used to store related data and functionality together.</p>
<h3>Object Features:</h3>
<ul>
  <li>Store multiple values as properties</li>
  <li>Properties can be any data type</li>
  <li>Can contain methods (functions)</li>
  <li>Can be nested</li>
</ul>
<h3>Accessing Properties:</h3>
<ul>
  <li>Dot notation: <code>object.property</code></li>
  <li>Bracket notation: <code>object['property']</code></li>
</ul>`,
      sampleCode: `// Creating objects
const person = {
  name: 'John Doe',
  age: 30,
  city: 'New York',
  hobbies: ['reading', 'coding', 'gaming'],
  greet: function() {
    return \`Hi, I'm \${this.name}\`;
  }
};

// Accessing properties
console.log(person.name); // John Doe
console.log(person['age']); // 30

// Adding properties
person.email = 'john@example.com';

// Calling methods
console.log(person.greet()); // Hi, I'm John Doe

// Object destructuring (ES6)
const { name, age } = person;
console.log(name, age); // John Doe 30`,
      order: 5,
      isPublished: true
    }
  ],
  'react-tutorial': [
    {
      title: 'React Introduction',
      slug: 'react-introduction',
      level: 'beginner',
      content: `<h2>What is React?</h2>
<p><strong>React</strong> is a JavaScript library for building user interfaces, particularly single-page applications. Developed by Facebook, it's component-based and declarative.</p>
<h3>Why Use React?</h3>
<ul>
  <li><strong>Component-Based:</strong> Build encapsulated components</li>
  <li><strong>Declarative:</strong> Design views for each state</li>
  <li><strong>Virtual DOM:</strong> Fast and efficient updates</li>
  <li><strong>Reusable:</strong> Write once, use anywhere</li>
  <li><strong>Large Ecosystem:</strong> Tons of libraries and tools</li>
</ul>
<h3>Key Concepts:</h3>
<ul>
  <li>Components</li>
  <li>JSX (JavaScript XML)</li>
  <li>Props</li>
  <li>State</li>
  <li>Hooks</li>
</ul>`,
      sampleCode: `import React from 'react';

// Functional Component
function Welcome() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Welcome to React development</p>
    </div>
  );
}

// Component with Props
function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}

// Using components
function App() {
  return (
    <div>
      <Welcome />
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}

export default App;`,
      order: 1,
      isPublished: true
    },
    {
      title: 'React Components',
      slug: 'react-components',
      level: 'beginner',
      content: `<h2>Understanding Components</h2>
<p>Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces.</p>
<h3>Types of Components:</h3>
<ul>
  <li><strong>Functional Components:</strong> Simple JavaScript functions (modern approach)</li>
  <li><strong>Class Components:</strong> ES6 classes (older approach)</li>
</ul>
<h3>Component Best Practices:</h3>
<ul>
  <li>One component per file</li>
  <li>Use PascalCase for names</li>
  <li>Keep components small and focused</li>
  <li>Make components reusable</li>
</ul>`,
      sampleCode: `// Simple Component
function Button() {
  return <button>Click Me</button>;
}

// Component with Props
function Card({ title, description, image }) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Using the Card component
function App() {
  return (
    <div>
      <Card 
        title="React Basics"
        description="Learn React fundamentals"
        image="react.png"
      />
    </div>
  );
}`,
      order: 2,
      isPublished: true
    },
    {
      title: 'React State and useState',
      slug: 'react-state-usestate',
      level: 'intermediate',
      content: `<h2>Understanding State</h2>
<p>State is data that changes over time in your component. When state changes, React re-renders the component.</p>
<h3>useState Hook:</h3>
<p>The <code>useState</code> hook lets you add state to functional components.</p>
<h3>Rules of Hooks:</h3>
<ul>
  <li>Only call hooks at the top level</li>
  <li>Only call hooks from React functions</li>
  <li>Hook names start with 'use'</li>
</ul>`,
      sampleCode: `import { useState } from 'react';

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

// Multiple state variables
function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  return (
    <form>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}`,
      order: 3,
      isPublished: true
    },
    {
      title: 'React Props',
      slug: 'react-props',
      level: 'beginner',
      content: `<h2>Understanding Props</h2>
<p>Props (short for properties) are how you pass data from parent to child components. They're read-only and help make components reusable.</p>
<h3>Key Points:</h3>
<ul>
  <li>Props are immutable (read-only)</li>
  <li>Passed from parent to child</li>
  <li>Can be any data type</li>
  <li>Use destructuring for cleaner code</li>
</ul>`,
      sampleCode: `// Child component receiving props
function UserCard({ name, age, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <span className="role">{role}</span>
    </div>
  );
}

// Parent component passing props
function Team() {
  const users = [
    { id: 1, name: 'Alice', age: 28, role: 'Developer', avatar: 'alice.jpg' },
    { id: 2, name: 'Bob', age: 32, role: 'Designer', avatar: 'bob.jpg' }
  ];
  
  return (
    <div>
      {users.map(user => (
        <UserCard 
          key={user.id}
          name={user.name}
          age={user.age}
          role={user.role}
          avatar={user.avatar}
        />
      ))}
    </div>
  );
}`,
      order: 4,
      isPublished: true
    },
    {
      title: 'React useEffect Hook',
      slug: 'react-useeffect',
      level: 'intermediate',
      content: `<h2>Understanding useEffect</h2>
<p>The <code>useEffect</code> hook lets you perform side effects in functional components. Side effects include data fetching, subscriptions, timers, and manually changing the DOM.</p>
<h3>Common Use Cases:</h3>
<ul>
  <li>Fetching data from an API</li>
  <li>Setting up subscriptions</li>
  <li>Updating document title</li>
  <li>Setting up timers</li>
</ul>
<h3>Dependency Array:</h3>
<p>The second argument controls when the effect runs.</p>`,
      sampleCode: `import { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Run once on mount
  useEffect(() => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []); // Empty array = run once
  
  if (loading) return <p>Loading...</p>;
  
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// useEffect with dependencies
function Timer({ delay }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, delay);
    
    // Cleanup function
    return () => clearInterval(timer);
  }, [delay]); // Re-run when delay changes
  
  return <p>Count: {count}</p>;
}`,
      order: 5,
      isPublished: true
    }
  ]
};

// Import & Seed Function
const importData = async () => {
  try {
    console.log('🗑️  Deleting existing data...'.yellow.bold);
    await User.deleteMany();
    await Topic.deleteMany();
    await Lesson.deleteMany();
    console.log('✅ Data deleted'.green.bold);

    console.log('👤 Creating users...'.cyan.bold);
    const createdUsers = await User.create(users);
    const adminUser = createdUsers.find(user => user.role === 'admin');
    console.log(`✅ Created ${createdUsers.length} users`.green.bold);

    console.log('📚 Creating topics...'.cyan.bold);
    const topicsWithUser = topics.map(topic => ({
      ...topic,
      createdBy: adminUser._id
    }));
    const createdTopics = await Topic.create(topicsWithUser);
    console.log(`✅ Created ${createdTopics.length} topics`.green.bold);

    console.log('📖 Creating lessons...'.cyan.bold);
    let totalLessons = 0;
    
    for (const topic of createdTopics) {
      const topicLessons = lessons[topic.slug];
      if (topicLessons) {
        const lessonsWithRefs = topicLessons.map(lesson => ({
          ...lesson,
          topicId: topic._id,
          createdBy: adminUser._id
        }));
        await Lesson.create(lessonsWithRefs);
        totalLessons += lessonsWithRefs.length;
      }
    }
    
    console.log(`✅ Created ${totalLessons} lessons`.green.bold);
    console.log('✨ Data imported successfully!'.green.bold);
    
    console.log('\n📋 Summary:'.cyan.bold);
    console.log(`   Users: ${createdUsers.length}`.white);
    console.log(`   Topics: ${createdTopics.length}`.white);
    console.log(`   Lessons: ${totalLessons}`.white);
    console.log('\n🔐 Admin Login:'.yellow.bold);
    console.log(`   Email: admin@learnify.com`.white);
    console.log(`   Password: admin123`.white);
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.bold);
    process.exit(1);
  }
};

// Delete Data Function
const deleteData = async () => {
  try {
    console.log('🗑️  Deleting all data...'.yellow.bold);
    await User.deleteMany();
    await Topic.deleteMany();
    await Lesson.deleteMany();
    console.log('✅ Data deleted successfully!'.green.bold);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.bold);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  connectDB().then(deleteData);
} else {
  connectDB().then(importData);
}
