export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface DodoPaymentWebhookData {
  eventType: string;
  orderId: string;
  planId: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  email: string;
  planId: string;
  credits: number;
  status: 'active' | 'expired' | 'cancelled';
  createdAt: string;
  updatedAt: string;
} 