
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Download, Users, FileText, Settings } from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-6 w-6 text-blue-600" />,
    title: "Lưu trữ thông tin gia phả",
    description: "Dễ dàng lưu trữ và quản lý thông tin gia phả của gia đình bạn"
  },
  {
    icon: <Users className="h-6 w-6 text-blue-600" />,
    title: "Quản lý thành viên",
    description: "Theo dõi và cập nhật thông tin của các thành viên trong gia đình"
  },
  {
    icon: <Settings className="h-6 w-6 text-blue-600" />,
    title: "Tùy chỉnh linh hoạt",
    description: "Tùy chỉnh giao diện và thông tin hiển thị theo ý muốn"
  }
];

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className={`space-y-6 ${isVisible ? 'fade-in' : ''}`}>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Phần mềm quản lý gia phả
              <span className="text-blue-600"> chuyên nghiệp</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Giải pháp toàn diện giúp bạn lưu trữ và quản lý thông tin gia phả một cách hiệu quả
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Dùng thử miễn phí
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-5 w-5" />
                Tải xuống
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá các tính năng mạnh mẽ giúp bạn quản lý gia phả một cách hiệu quả
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl hover-lift"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-50 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Xem trước phần mềm
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Trải nghiệm giao diện người dùng thân thiện và dễ sử dụng
            </p>
          </div>
          
          <div className="glass-card rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Preview"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bắt đầu sử dụng ngay hôm nay
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hãy để chúng tôi giúp bạn lưu giữ và phát triển gia phả của gia đình
          </p>
          <Button size="lg" variant="secondary" className="hover:bg-white/90">
            Dùng thử miễn phí
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
