import { RuleColumn } from './rule-column.interface';

export interface Rule {
  columns: {
    [key: string]: RuleColumn;
  }
  validUntil?: number;
}