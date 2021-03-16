import { SortOrder } from './common.model';

export interface PurchaseSortOption {
  key: 'timestamp' | 'cost';
  order: SortOrder;
}

export interface Redemption {
  id: string;
  user_input: string;
  reward: {
    id: string;
  };
  user: {
    display_name: string;
    login: string;
  };
  user_name: string;
}

export interface RedemptionMessage {
  redemption: Redemption;
}

export enum RedemptionStatus {
  Canceled = 'CANCELED',
  Unfulfilled = 'UNFULFILLED',
  Fulfilled = 'FULFILLED',
}
