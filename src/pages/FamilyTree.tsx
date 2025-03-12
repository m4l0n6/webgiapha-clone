import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, List } from "lucide-react";
import { useState } from "react";
import { CreateMemberForm } from "@/components/CreateMemberForm";

const FamilyTree = () => {
  const [isCreateMember, setIsCreateMember] = useState(false);
  
  return (
    <div className="bg-[#F6F6F7] p-6 min-h-screen">
      <div className="fixed top-4 left-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Về trang chủ
        </Link>
      </div>

      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gia phả của tôi</h1>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setIsCreateMember(true)}
            >
              <UserPlus className="h-4 w-4" />
              Thêm thành viên
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <List className="h-4 w-4" />
              Danh sách thành viên
            </Button>
          </div>
        </div>

        {isCreateMember ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Thêm thành viên mới</h2>
            <CreateMemberForm onSuccess={() => setIsCreateMember(false)} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">
              Bắt đầu xây dựng gia phả của bạn bằng cách thêm thành viên đầu tiên.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
