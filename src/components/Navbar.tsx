
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-blue-600">GiaPha</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Tính năng</a>
            <a href="#preview" className="text-gray-700 hover:text-blue-600 transition-colors">Xem trước</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">Bảng giá</a>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Dùng thử miễn phí
            </Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Tính năng</a>
            <a href="#preview" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Xem trước</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Bảng giá</a>
            <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white">
              Dùng thử miễn phí
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
