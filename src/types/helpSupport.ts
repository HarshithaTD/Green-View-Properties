// src/types/helpSupport.ts

export interface TopicItemType {
  id: string;
  title: string;
  icon: string;
}

export interface ContactCardProps {
  icon: string;
  title: string;
  subtitle: string;
  value: string;
  onPress: () => void;
}