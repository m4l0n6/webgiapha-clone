import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { FamilyMember } from '@/types/family';

interface MemberListProps {
  members: FamilyMember[];
  onSelect: (member: FamilyMember) => void;
  onDelete: (id: string) => void;
}

const MemberList = ({ members, onSelect, onDelete }: MemberListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {members.map(member => (
        <Card key={member.id} className="p-4">
          <div className="flex items-start justify-between">
            <div
              className="flex-1 cursor-pointer"
              onClick={() => onSelect(member)}
            >
              <div className="flex items-center gap-3">
                {member.imageUrl && (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">
                    {member.birthYear} - {member.deathYear || 'nay'}
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(member.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
      
      {members.length === 0 && (
        <div className="col-span-2 text-center py-8 text-gray-500">
          Chưa có thành viên nào. Hãy thêm thành viên mới!
        </div>
      )}
    </div>
  );
};

export default MemberList;
