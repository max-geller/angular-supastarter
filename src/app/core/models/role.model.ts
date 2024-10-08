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
  role_permissions: RolePermissionInterface[];
}

export interface RolePermissionInterface {
  id: number;
  role_id: number;
  permission_id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}
