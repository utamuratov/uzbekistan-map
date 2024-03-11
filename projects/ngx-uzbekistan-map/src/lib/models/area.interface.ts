import { IName } from './i-name.model';

export interface IArea extends IName {
  id: string;
  parent_id?: string;
  districts?: any;
}
