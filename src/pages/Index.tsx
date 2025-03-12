import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ArrowRight,
  CheckCircle,
  Users,
  FileText,
  Settings,
  UserRoundPlus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const features = [
  {
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    title: "Lưu trữ thông tin gia phả",
    description:
      "Dễ dàng lưu trữ và quản lý thông tin gia phả của gia đình bạn",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600" />,
    title: "Quản lý thành viên",
    description:
      "Theo dõi và cập nhật thông tin của các thành viên trong gia đình",
  },
  {
    icon: <Settings className="w-6 h-6 text-blue-600" />,
    title: "Tùy chỉnh linh hoạt",
    description: "Tùy chỉnh giao diện và thông tin hiển thị theo ý muốn",
  },
];

const previewImages = [
  "https://images.unsplash.com/photo-1655185497013-db98aca061d3",
  "https://images.unsplash.com/photo-1643869355390-4dcffc63d049",
];

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const username = user.user_metadata?.full_name || 'default';
      navigate(`/dashboard/${username}/family-tree`);
      return;
    }
    setIsVisible(true);
  }, [user, navigate]);

  if (!isVisible) return null;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="px-4 pt-32 pb-20 hero-gradient">
        <div className="mx-auto max-w-7xl text-center">
          <div className={`space-y-6 ${isVisible ? "fade-in" : ""}`}>
            <h1 className="font-bold text-gray-900 text-4xl md:text-6xl leading-tight">
              Phần mềm quản lý gia phả
              <span className="text-blue-600"> chuyên nghiệp</span>
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 text-xl">
              Giải pháp toàn diện giúp bạn lưu trữ và quản lý thông tin gia phả
              một cách hiệu quả
            </p>
            <div className="flex justify-center pt-6">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate("/family-tree")}
              >
                Dùng thử ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
              Tính năng nổi bật
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Khám phá các tính năng mạnh mẽ giúp bạn quản lý gia phả một cách
              hiệu quả
            </p>
          </div>

          <div className="gap-8 grid md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl glass-card hover-lift">
                <div className="flex justify-center items-center bg-blue-50 mb-4 rounded-lg w-12 h-12">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 text-xl">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview" className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
              Xem trước phần mềm
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Trải nghiệm giao diện người dùng thân thiện và dễ sử dụng
            </p>
          </div>
          <Carousel className="mx-auto w-full max-w-4xl">
            <CarouselContent>
              {Array.from({ length: 2 }).map((_, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={previewImages[index]}
                      alt="Preview"
                      className="w-full object-cover"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 font-bold text-3xl md:text-4xl">
            Bắt đầu sử dụng ngay hôm nay
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-blue-100 text-xl">
            Hãy để chúng tôi giúp bạn lưu giữ và phát triển gia phả của gia đình
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="hover:bg-white/90"
            onClick={() => navigate("/auth")}
          >
            Đăng nhập ngay
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      <section id="contact" className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 font-bold text-3xl md:text-4xl">Liên hệ ngay</h2>
          <div>
            <p className="mx-auto mb-6 max-w-2xl text-xl">
              Nhập thông tin và nội dung muốn tư vấn
            </p>
            <form action="" className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Họ và tên"
                  className="mx-auto max-w-md"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Email"
                  className="mx-auto max-w-md"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Nội dung"
                  className="mx-auto max-w-md"
                ></Textarea>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Gửi
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
