import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import MemberForm from './MemberForm';
import type { FamilyMember } from '@/types/family';

interface MemberDetailProps {
  member: FamilyMember;
  onUpdate: (member: FamilyMember) => void;
  onClose: () => void;
  availableMembers: FamilyMember[];
}

const MemberDetail = ({ member, onUpdate, onClose, availableMembers }: MemberDetailProps) => {
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
        availableMembers={availableMembers}
      />
    );
  }

  const parent = availableMembers.find(m => m.id === member.relationship?.parentId);
  const spouse = availableMembers.find(m => m.id === member.relationship?.spouseId);

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
        <div>
          <label className="text-sm text-gray-500">Quan hệ gia đình</label>
          <div className="mt-1">
            {parent && <p>Cha/Mẹ: {parent.name}</p>}
            {spouse && <p>Vợ/Chồng: {spouse.name}</p>}
            {!parent && !spouse && <p>Chưa thiết lập quan hệ</p>}
          </div>
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
