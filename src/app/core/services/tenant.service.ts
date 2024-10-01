import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Import Services
import { SupabaseService } from './supabase.service';

// Import Models
import { TenantInterface } from '../models/tenant.model';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private supabase: SupabaseService) {}

}
