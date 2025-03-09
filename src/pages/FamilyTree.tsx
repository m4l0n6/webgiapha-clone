
import { useState, useEffect } from 'react';
import { Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import MemberForm from '@/components/MemberForm';
import MemberList from '@/components/MemberList';
import MemberDetail from '@/components/MemberDetail';

export interface FamilyMember {
  id: string;
  name: string;
  birthYear?: string;
  deathYear?: string;
  imageUrl?: string;
  additionalInfo?: string;
  relationship?: {
    parentId?: string;
    spouseId?: string;
    childrenIds?: string[];
  };
}

interface FlowNode {
  id: string;
  type: string;
  data: { label: string; member: FamilyMember };
  position: { x: number; y: number };
}

const FamilyTree = () => {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const savedMembers = localStorage.getItem('familyMembers');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
  }, []);

  useEffect(() => {
    // Convert members to nodes and edges
    const flowNodes: FlowNode[] = members.map((member, index) => ({
      id: member.id,
      type: 'default',
      data: { 
        label: `${member.name}\n${member.birthYear || ''} - ${member.deathYear || 'nay'}`,
        member 
      },
      position: { x: index * 200, y: 0 },
    }));

    const flowEdges = members.flatMap(member => {
      const edges = [];
      if (member.relationship?.parentId) {
        edges.push({
          id: `${member.relationship.parentId}-${member.id}`,
          source: member.relationship.parentId,
          target: member.id,
          animated: true,
        });
      }
      if (member.relationship?.spouseId) {
        edges.push({
          id: `${member.id}-${member.relationship.spouseId}`,
          source: member.id,
          target: member.relationship.spouseId,
          type: 'straight',
          style: { strokeDasharray: '5,5' },
        });
      }
      return edges;
    });

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [members, setNodes, setEdges]);

  const saveMembersToStorage = (updatedMembers: FamilyMember[]) => {
    localStorage.setItem('familyMembers', JSON.stringify(updatedMembers));
  };

  const handleAddMember = (member: FamilyMember) => {
    const newMembers = [...members, member];
    setMembers(newMembers);
    saveMembersToStorage(newMembers);
    setIsFormOpen(false);
  };

  const handleUpdateMember = (updatedMember: FamilyMember) => {
    const newMembers = members.map(member =>
      member.id === updatedMember.id ? updatedMember : member
    );
    setMembers(newMembers);
    saveMembersToStorage(newMembers);
    setSelectedMember(null);
  };

  const handleDeleteMember = (id: string) => {
    const newMembers = members.filter(member => member.id !== id);
    setMembers(newMembers);
    saveMembersToStorage(newMembers);
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-[#F6F6F7]">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý gia phả</h1>
          <Button onClick={() => setIsFormOpen(true)}>Thêm thành viên mới</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <MemberList
              members={members}
              onSelect={setSelectedMember}
              onDelete={handleDeleteMember}
            />
          </div>
          <div>
            {selectedMember ? (
              <MemberDetail
                member={selectedMember}
                onUpdate={handleUpdateMember}
                onClose={() => setSelectedMember(null)}
                availableMembers={members.filter(m => m.id !== selectedMember.id)}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-center h-40">
                  <Square className="h-16 w-16 text-gray-300" />
                  <p className="text-gray-500 mt-4">Chọn thành viên để xem chi tiết</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-4" style={{ height: '400px' }}>
          <h2 className="text-xl font-semibold mb-4">Sơ đồ gia phả</h2>
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

        {isFormOpen && (
          <MemberForm
            onSubmit={handleAddMember}
            onClose={() => setIsFormOpen(false)}
            availableMembers={members}
          />
        )}
      </div>
    </div>
  );
};

export default FamilyTree;
