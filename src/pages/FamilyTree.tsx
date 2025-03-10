import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import MemberForm from "@/components/MemberForm";
import MemberList from "@/components/MemberList";
import { UserPlus, ArrowLeft } from "lucide-react";
import type { FamilyMember } from "@/types/family";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const FamilyTree = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedMembers = localStorage.getItem("familyMembers");
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
  }, []);

  const handleAddFirstMember = () => {
    if (!newMemberName.trim()) return;

    const newMember: FamilyMember = {
      id: crypto.randomUUID(),
      name: newMemberName,
      relationship: {
        parentId: undefined,
        spouseId: undefined,
        childrenIds: [],
      },
    };

    setMembers([...members, newMember]);
    setNewMemberName("");
    localStorage.setItem(
      "familyMembers",
      JSON.stringify([...members, newMember])
    );
    toast({
      title: "Thành công",
      description: "Đã thêm thành viên đầu tiên vào gia phả",
    });

    // Add first member to React Flow nodes
    const newNode = {
      id: newMember.id,
      data: { label: newMember.name },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleAddMember = (member: FamilyMember) => {
    const updatedMembers = [...members, member];
    setMembers(updatedMembers);
    localStorage.setItem("familyMembers", JSON.stringify(updatedMembers));
    setShowAddForm(false);
    toast({
      title: "Thành công",
      description: "Đã thêm thành viên mới vào gia phả",
    });

    // Add new member to React Flow nodes
    const newNode = {
      id: member.id,
      data: { label: member.name },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: "default",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleUpdateMember = (updatedMember: FamilyMember) => {
    const updatedMembers = members.map((m) =>
      m.id === updatedMember.id ? updatedMember : m
    );
    setMembers(updatedMembers);
    localStorage.setItem("familyMembers", JSON.stringify(updatedMembers));
    toast({
      title: "Thành công",
      description: "Đã cập nhật thông tin thành viên",
    });
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedMembers = members
      .map((member) => ({
        ...member,
        relationship: {
          ...member.relationship,
          parentId:
            member.relationship?.parentId === memberId
              ? undefined
              : member.relationship?.parentId,
          spouseId:
            member.relationship?.spouseId === memberId
              ? undefined
              : member.relationship?.spouseId,
          childrenIds:
            member.relationship?.childrenIds?.filter((id) => id !== memberId) ||
            [],
        },
      }))
      .filter((m) => m.id !== memberId);

    setMembers(updatedMembers);
    localStorage.setItem("familyMembers", JSON.stringify(updatedMembers));
    toast({
      title: "Thành công",
      description: "Đã xóa thành viên khỏi gia phả",
    });

    // Remove member from React Flow nodes
    setNodes((nds) => nds.filter((node) => node.id !== memberId));
  };

  return (
    <div className="bg-[#F6F6F7] p-6 min-h-screen">
      <div className="top-4 left-4 fixed">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Về trang chủ
        </Link>
      </div>
      <div className="mx-auto max-w-4xl">
        {members.length === 0 ? (
          <div className="bg-[#EEF1FF] mb-8 p-6 rounded-lg">
            <h2 className="mb-4 font-medium text-lg text-center">
              Nhập tên thành viên đầu tiên để Tạo cây mới
            </h2>
            <div className="flex gap-2 mx-auto max-w-xl">
              <Input
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="Nhập tên thành viên"
                className="flex-1"
              />
              <Button
                onClick={handleAddFirstMember}
                className="bg-[#3AB60B] hover:bg-[#2E9907]"
              >
                Tạo Cây
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-2xl">Danh sách thành viên</h1>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#3AB60B] hover:bg-[#2E9907]"
                >
                  <UserPlus className="mr-2 w-4 h-4" />
                  Thêm thành viên
                </Button>
              </div>
              <p className="text-gray-600">
                Có {members.length} thành viên (giới hạn{" "}
                <span className="font-semibold">100</span>, nâng giới hạn{" "}
                <a href="#" className="text-blue-500 hover:underline">
                  Tại đây
                </a>
                )
              </p>
            </div>

            <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
              <div className="col-span-1">
                <MemberList
                  members={members}
                  onDelete={handleDeleteMember}
                  onUpdate={handleUpdateMember}
                />
              </div>

              <div
                className="lg:col-span-2 bg-white shadow p-4 rounded-lg"
                style={{ height: "600px" }}
              >
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  fitView
                >
                  <Background />
                  <Controls />
                  <MiniMap />
                </ReactFlow>
              </div>
            </div>
          </>
        )}

        {showAddForm && (
          <MemberForm
            onSubmit={handleAddMember}
            onClose={() => setShowAddForm(false)}
            availableMembers={members}
          />
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
