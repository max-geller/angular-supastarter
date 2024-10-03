import { TeamInterface } from './team.model';
import { RoleInterface } from './role.model';
export interface UserInterface {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    tenant_id: string;
    tenant_name?: string;
    last_login?: string;
    is_registered: boolean;
    teams: TeamInterface[];
    role: RoleInterface[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
    invited_by: string;
}
