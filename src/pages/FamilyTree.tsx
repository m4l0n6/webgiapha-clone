
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import MemberForm from '@/components/MemberForm';
import MemberList from '@/components/MemberList';
import { UserPlus } from 'lucide-react';
import type { FamilyMember } from '@/types/family';
import { useToast } from '@/components/ui/use-toast';

const FamilyTree = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedMembers = localStorage.getItem('familyMembers');
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
      }
    };

    setMembers([...members, newMember]);
    setNewMemberName('');
    localStorage.setItem('familyMembers', JSON.stringify([...members, newMember]));
    toast({
      title: "Thành công",
      description: "Đã thêm thành viên đầu tiên vào gia phả",
    });
  };

  const handleAddMember = (member: FamilyMember) => {
    const updatedMembers = [...members, member];
    setMembers(updatedMembers);
    localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));
    setShowAddForm(false);
    toast({
      title: "Thành công",
      description: "Đã thêm thành viên mới vào gia phả",
    });
  };

  const handleUpdateMember = (updatedMember: FamilyMember) => {
    const updatedMembers = members.map(m => 
      m.id === updatedMember.id ? updatedMember : m
    );
    setMembers(updatedMembers);
    localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));
    toast({
      title: "Thành công",
      description: "Đã cập nhật thông tin thành viên",
    });
  };

  const handleDeleteMember = (memberId: string) => {
    const updatedMembers = members.map(member => ({
      ...member,
      relationship: {
        ...member.relationship,
        parentId: member.relationship?.parentId === memberId ? undefined : member.relationship?.parentId,
        spouseId: member.relationship?.spouseId === memberId ? undefined : member.relationship?.spouseId,
        childrenIds: member.relationship?.childrenIds?.filter(id => id !== memberId) || [],
      }
    })).filter(m => m.id !== memberId);

    setMembers(updatedMembers);
    localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));
    toast({
      title: "Thành công",
      description: "Đã xóa thành viên khỏi gia phả",
    });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F7] p-6">
      <div className="max-w-4xl mx-auto">
        {members.length === 0 ? (
          <div className="bg-[#EEF1FF] rounded-lg p-6 mb-8">
            <h2 className="text-center text-lg font-medium mb-4">
              Nhập tên thành viên đầu tiên để Tạo cây mới
            </h2>
            <div className="flex gap-2 max-w-xl mx-auto">
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
                <h1 className="text-2xl font-bold">Danh sách thành viên</h1>
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#3AB60B] hover:bg-[#2E9907]"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Thêm thành viên
                </Button>
              </div>
              <p className="text-gray-600">
                Có {members.length} thành viên (giới hạn {' '}
                <span className="font-semibold">100</span>, nâng giới hạn{' '}
                <a href="#" className="text-blue-500 hover:underline">
                  Tại đây
                </a>
                )
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1">
                <MemberList 
                  members={members}
                  onDelete={handleDeleteMember}
                  onUpdate={handleUpdateMember}
                />
              </div>
              
              <div className="lg:col-span-2 bg-white rounded-lg shadow p-4" style={{ height: '600px' }}>
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
