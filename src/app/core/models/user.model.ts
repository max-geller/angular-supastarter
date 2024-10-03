export interface UserInterface {
    id: string;
    tenant_id: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    first_name?: string;
    last_name?: string;
    last_login?: string;
    is_registered: boolean;
    tenant_name?: string;
}
