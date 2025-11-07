export interface Specialty {
  name: string;
  count: number;
}

export interface Therapist {
  id: number;
  name: string;
  role: string;
  rating: number;
  image: string;
  tags: string[];
  price: number;
  isFavorite: boolean;
}

export interface Filters {
  specialties: string[];
  priceRange: number[];
  rating: number | null;
  distance: number[];
}

export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onApply: (filters: Filters) => void;
}

export interface TherapistCardProps {
  therapist: Therapist;
  onToggleFavorite: (id: number) => void;
}
