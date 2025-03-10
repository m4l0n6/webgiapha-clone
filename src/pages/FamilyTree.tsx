import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, ArrowLeft } from "lucide-react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const FamilyTree = () => {
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
