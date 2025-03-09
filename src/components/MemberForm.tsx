
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import type { FamilyMember } from '@/pages/FamilyTree';

interface MemberFormProps {
  member?: FamilyMember;
  onSubmit: (member: FamilyMember) => void;
  onClose: () => void;
  availableMembers?: FamilyMember[];
}

const MemberForm = ({ member, onSubmit, onClose, availableMembers = [] }: MemberFormProps) => {
  const [formData, setFormData] = useState({
    id: member?.id || crypto.randomUUID(),
    name: member?.name || '',
    birthYear: member?.birthYear || '',
    deathYear: member?.deathYear || '',
    imageUrl: member?.imageUrl || '',
    additionalInfo: member?.additionalInfo || '',
    relationship: member?.relationship || {
      parentId: undefined,
      spouseId: undefined,
      childrenIds: [],
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const eligibleParents = availableMembers.filter(m => m.id !== formData.relationship?.spouseId);
  const eligibleSpouses = availableMembers.filter(m => m.id !== formData.relationship?.parentId);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{member ? 'Cập nhật thông tin' : 'Thêm thành viên mới'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Năm sinh</label>
            <Input
              value={formData.birthYear}
              onChange={e => setFormData({ ...formData, birthYear: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Năm mất</label>
            <Input
              value={formData.deathYear}
              onChange={e => setFormData({ ...formData, deathYear: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL ảnh</label>
            <Input
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Cha/Mẹ</label>
            <Select
              value={formData.relationship?.parentId}
              onValueChange={(value) => setFormData({
                ...formData,
                relationship: {
                  ...formData.relationship,
                  parentId: value
                }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn cha/mẹ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Không có</SelectItem>
                {eligibleParents.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Vợ/Chồng</label>
            <Select
              value={formData.relationship?.spouseId}
              onValueChange={(value) => setFormData({
                ...formData,
                relationship: {
                  ...formData.relationship,
                  spouseId: value
                }
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn vợ/chồng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Không có</SelectItem>
                {eligibleSpouses.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Thông tin thêm</label>
            <Textarea
              value={formData.additionalInfo}
              onChange={e => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">
              {member ? 'Cập nhật' : 'Thêm'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberForm;
