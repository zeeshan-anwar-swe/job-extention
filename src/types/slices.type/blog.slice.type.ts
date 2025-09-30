interface TCategoryCreator {
	id: string;
	image: string | null;
	lastName: string;
	firstName: string;
}

export interface TBlogCategory {
	id: string;
	name: string;
	order: number;
	createdAt: string;
	updatedAt: string;
	blogCount: number;
	creator: TCategoryCreator;
}

export interface TBlogCategoryDetails {
	id: string;
	name: string;
	order: number;
	createdAt: string;
	updatedAt: string;
	blogCount: number;
	creator: TCategoryCreator;
}

export interface TBlogPost {
	id: string;
	title: string;
	image: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	categoryId: string;
	readingTime: number;
	status: 'published' | 'not_active';
	category: {
		id: string;
		name: string;
	};
	creator: {
		id: string;
		firstName: string;
		lastName: string;
		image: string;
	};
}

export interface TBlogInitialState {
	blogPosts: {
		count: number;
		tab: TBlogCategory | null;
		search: string;
		loading: boolean;
		rows: TBlogPost[];
		error: Error | null;
	};

	blogDetails: {
		loading: boolean;
		error: Error | null;
		data: TBlogPost | null;
	};

	blogCategoryList: {
		count: number;
		search: string;
		loading: boolean;
		error: Error | null;
		rows: TBlogCategory[];
	};

	blogCategoryDetails: {
		loading: boolean;
		error: Error | null;
		data: TBlogCategoryDetails | null;
	};
}
