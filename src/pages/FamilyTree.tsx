import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  UserPlus,
  Edit,
  List,
  Ban,
  Users,
  UserRound,
  UserCog,
  Plus,
  Heart,
  Star,
} from "lucide-react";
import "reactflow/dist/style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
interface FamilyMember {
  id: Date;
  name: string | null;
}
const FamilyTree = () => {
  const [isCreateMember, setIsCreateMember] = useState(false);

  const [familyTree, setFamilyTree] = useState<FamilyMember[]>([]);

  const handleCreateFirstMember = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name") as string;
    setFamilyTree([{ id: new Date(), name }]);
    setIsCreateMember(true);
  };
  console.log(familyTree);
  return (
    <div className="bg-[#F6F6F7] p-6 h-screen overflow-hidden">
      <div className="top-4 left-4 fixed">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default FamilyTree;
