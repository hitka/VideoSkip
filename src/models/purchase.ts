import { SortOrder } from './common.model';

export interface PurchaseSortOption {
  key: 'timestamp' | 'cost';
  order: SortOrder;
}

export interface RedemptionMessage {
  redemption: {
    id: string;
    user_input: string;
    reward: {
      id: string;
    };
    user: {
      display_name: string;
      login: string;
    };
  };
}
