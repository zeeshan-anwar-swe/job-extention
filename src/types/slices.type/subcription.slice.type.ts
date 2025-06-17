export interface TSubcriptionPlan {
	id: string;
	lookup_key: string;
	currency: string;
	description: string;
	images: string[];
	name: string;
	unit_amount: number;
}


export interface TSInvoice {
  id: string;
  lookup_key: string;
  invoiceNumber: string;
  amount: string;
  status: string;
  invoicePdf: string;
  createdAt: number;
}

export interface TSubscription {
  id: string;
  status: string;
  activePlan: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}


export interface SubcriptionInitialStateType {
	userSubscription: {
		loading: boolean;
		error: null | Error;
		data: {
			subscription: TSubscription | null;
			invoices: TSInvoice[];
		};
	};
	subscriptionPlans: {
		loading: boolean;
		error: null | Error;
		data: TSubcriptionPlan[];
	};
}
