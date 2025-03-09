
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import type { FamilyMember } from '@/types/family';
import MemberForm from './MemberForm';

interface MemberListProps {
  members: FamilyMember[];
  onDelete: (memberId: string) => void;
  onUpdate: (member: FamilyMember) => void;
}

const MemberList = ({ members, onDelete, onUpdate }: MemberListProps) => {
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <Card key={member.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{member.name}</h3>
              {member.birthYear && (
                <p className="text-sm text-gray-500">
                  {member.birthYear} - {member.deathYear || 'nay'}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setEditingMember(member)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(member.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {editingMember && (
        <MemberForm
          member={editingMember}
          onSubmit={(member) => {
            onUpdate(member);
            setEditingMember(null);
          }}
          onClose={() => setEditingMember(null)}
          availableMembers={members.filter(m => m.id !== editingMember.id)}
        />
      )}
    </div>
  );
};

export default MemberList;
