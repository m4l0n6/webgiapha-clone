
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import MemberForm from '@/components/MemberForm';
import type { FamilyMember } from '@/types/family';

const FamilyTree = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [newMemberName, setNewMemberName] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

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
  };

  return (
    <div className="min-h-screen bg-[#F6F6F7] p-6">
      <div className="max-w-4xl mx-auto">
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

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center mb-4">Danh sách cây</h1>
          <p className="text-center text-gray-600">
            Có {members.length} cây với tổng số {members.length} thành viên (giới hạn {' '}
            <span className="font-semibold">100</span>, nâng giới hạn{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Tại đây
            </a>
            )
          </p>
        </div>

        {members.length > 0 && (
          <div className="bg-white rounded-lg shadow p-4" style={{ height: '400px' }}>
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
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
