export interface FormikFormProps {
  title: string;
  description?: string;
  tags?: string[];
  imageUrls?: string[];
  attribution?: {
    originalCreator: string;
    // license: string;
    source: string;
  };
}

