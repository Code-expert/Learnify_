import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiBook, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const userMenuRef = useRef(null);

  // Handle scroll effect and progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrolled / height) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false);
        if (showUserMenu) setShowUserMenu(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, showUserMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setShowUserMenu(false);
    navigate('/');
  };

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive 
        ? 'text-primary-600 bg-primary-50' 
        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
    }`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/70 backdrop-blur-xl shadow-lg border-b border-gray-200/50' 
            : 'bg-white/90 backdrop-blur-md'
        }`}
        aria-label="Main navigation"
        role="navigation"
      >
        {/* Animated progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transition-all duration-200 rounded-r-full"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                
                {/* Logo container */}
                <div className="relative w-12 h-12 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl">
                  <span className="text-white font-bold text-2xl">L</span>
                </div>
              </div>
              
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  Learnify
                </span>
                <p className="text-xs text-gray-500 font-medium -mt-1">Learn. Build. Grow.</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/" className={navLinkClass('/')}>
                <FiHome className="text-lg" />
                <span>Home</span>
                {location.pathname === '/' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </Link>
              
              <Link to="/topics" className={navLinkClass('/topics')}>
                <FiBook className="text-lg" />
                <span>Topics</span>
                {location.pathname === '/topics' && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></div>
                )}
              </Link>

              {/* User Menu or Admin Login */}
              {user ? (
                <div className="relative ml-2" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                    aria-label="User menu"
                    aria-expanded={showUserMenu}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white">
                        {user.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-gray-700 leading-tight">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role}
                      </p>
                    </div>
                    
                    <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-fadeIn overflow-hidden">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-br from-primary-50 to-secondary-50">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors text-gray-700 group"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                            <FiUser className="text-primary-600" />
                          </div>
                          <span className="font-medium">Dashboard</span>
                        </Link>
                      )}
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <FiLogOut className="text-red-600" />
                        </div>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/admin/login"
                  className="ml-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 btn-glow"
                >
                  Admin Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 active:scale-95 transition-all"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                <span className={`absolute w-full h-0.5 bg-current top-3 transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Menu Panel */}
        <div
          className={`absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          id="mobile-menu"
        >
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`${navLinkClass('/')} w-full justify-start`}
            >
              <FiHome className="text-xl" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/topics"
              onClick={() => setIsOpen(false)}
              className={`${navLinkClass('/topics')} w-full justify-start`}
            >
              <FiBook className="text-xl" />
              <span>Topics</span>
            </Link>

            {user ? (
              <>
                <div className="h-px bg-gray-200 my-4"></div>
                
                <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium shadow-lg"
                  >
                    <FiUser className="text-xl" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
                >
                  <FiLogOut className="text-xl" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="h-px bg-gray-200 my-4"></div>
                
                <Link
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium shadow-lg"
                >
                  <FiUser />
                  <span>Admin Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
