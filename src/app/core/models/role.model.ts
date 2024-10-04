import { PermissionInterface } from './permission.model';

export interface RoleInterface {
  id: number;
  name: string;
  description: string;
  permissions: PermissionInterface[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}
