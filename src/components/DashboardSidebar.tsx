
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tree, GitFork, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardSidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const username = user?.user_metadata?.full_name || 'default';

  const menuItems = [
    {
      title: "Phả đồ",
      icon: Tree,
      path: `/dashboard/${username}/family-tree`,
    },
    {
      title: "Phả hệ",
      icon: GitFork,
      path: `/dashboard/${username}/genealogy`,
    },
    {
      title: "Danh sách thành viên",
      icon: Users,
      path: `/dashboard/${username}/members`,
    },
  ];

  return (
    <div className="min-h-screen w-64 bg-white border-r border-gray-200">
      <div className="p-4">
        <Link to="/" className="text-xl font-bold text-blue-600">
          GiaPhaAI
        </Link>
      </div>
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors",
              location.pathname === item.path && "bg-blue-50 text-blue-600"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};
