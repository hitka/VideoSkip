import { Color } from '@material-ui/lab/Alert/Alert';

export enum AlertTypeEnum {
  Success = 'success',
  Error = 'error',
}

export interface AlertProps {
  message: string;
  type: Color;
  duration?: number;
}

export interface AlertType extends AlertProps {
  id: number;
}
