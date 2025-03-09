
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import MemberForm from './MemberForm';
import type { FamilyMember } from '@/pages/FamilyTree';

interface MemberDetailProps {
  member: FamilyMember;
  onUpdate: (member: FamilyMember) => void;
  onClose: () => void;
}

const MemberDetail = ({ member, onUpdate, onClose }: MemberDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <MemberForm
        member={member}
        onSubmit={(updatedMember) => {
          onUpdate(updatedMember);
          setIsEditing(false);
        }}
        onClose={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">Chi tiết thông tin</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
          <Edit2 className="h-4 w-4" />
        </Button>
      </div>

      {member.imageUrl && (
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">Họ và tên</label>
          <p className="font-medium">{member.name}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Năm sinh</label>
          <p className="font-medium">{member.birthYear || 'Chưa có thông tin'}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">Năm mất</label>
          <p className="font-medium">{member.deathYear || 'Còn sống'}</p>
        </div>
        {member.additionalInfo && (
          <div>
            <label className="text-sm text-gray-500">Thông tin thêm</label>
            <p className="font-medium whitespace-pre-wrap">{member.additionalInfo}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MemberDetail;
