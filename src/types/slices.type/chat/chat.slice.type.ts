export interface Message {
  senderId: string;
  receiverId: string;
  sender: {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
  receiver: {
    id: string;
    firstName: string;
    lastName: string;
    image: string | null;
  };
  text: string;
  createdAt: string; // ISO 8601 date string
  unreadCount: number;
}
  
  
  
export interface ChatDataType {
	loading: boolean;
	rows: Message[];
	count: number;
	error: null | any;
}

export interface ChatInitialStateType {
	chatData: ChatDataType;
}
