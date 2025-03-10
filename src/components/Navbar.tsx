import { useState, useEffect } from "react";
import { Menu, X, Search, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="font-bold text-blue-600 text-2xl">
              GiaPhaAI
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Tính năng
            </a>
            <a
              href="#preview"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Xem trước
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Liên hệ
            </a>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
              <Search className="top-2.5 left-3 absolute w-5 h-5 text-gray-400" />
            </form>
            <Link to="/auth">
              <Button variant="outline" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Đăng nhập
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <form onSubmit={handleSearch} className="relative p-2">
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
              <Search className="top-4.5 left-5 absolute w-5 h-5 text-gray-400" />
            </form>
            <a
              href="#features"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Tính năng
            </a>
            <a
              href="#preview"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Xem trước
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-gray-700 hover:text-blue-600"
            >
              Bảng giá
            </a>
            <Link to="/auth" className="block w-full">
              <Button
                variant="outline"
                className="flex justify-center items-center gap-2 w-full"
              >
                <LogIn className="w-4 h-4" />
                Đăng nhập
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 mt-2 w-full text-white">
              Dùng thử miễn phí
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
