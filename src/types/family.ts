
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
