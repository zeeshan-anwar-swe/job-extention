export interface ChatSender {
	name: string;
	email: string;
	image: string | null;
  }
  
  export interface ChatRow {
	id: string;
	text: string;
	mediaType: string;
	mediaUrl: string | null;
	seen: boolean;
	sender: ChatSender;
	createdAt: string;
  }
  
  
  
export interface ChatDataType {
	loading: boolean;
	rows: ChatRow[];
	count: number;
	error: null | any;
}

export interface ChatInitialStateType {
	chatData: ChatDataType;
}
