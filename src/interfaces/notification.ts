export interface NotificationDetailProps {
  notification: Notification;
  onClose: () => void;
  onMarkAsRead: (id: string | number) => void;
}

// Define a reusable Notification type
export interface Notification {
  id: string | number;
  title: string;
  content: string;
  fullContent: string;
  time: string;
  type: "appointment" | "general" | string;
  avatar?: string;
  initials?: string;
  isRead: boolean;
}
export interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
// export interface Notification {
//   avatar?: string;
//   initials: string;
//   title: string;
//   content: string;
//   fullContent: string;
//   id: string | number;
//   time: string;
//   isRead: boolean;
// }

export interface NotificationItemProps {
  notification: Notification;
  onClick: (notification: Notification) => void;
}
