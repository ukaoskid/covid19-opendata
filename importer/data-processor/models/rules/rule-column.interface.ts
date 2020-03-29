import { ReplaceRule } from './replace-rule.interface';

export interface RuleColumn {
  header: string;
  type: string;
  replace?: ReplaceRule[];
}