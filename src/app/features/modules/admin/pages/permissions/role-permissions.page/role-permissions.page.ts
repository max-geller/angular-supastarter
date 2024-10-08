import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Import RxJS Resources
import { Observable, switchMap } from 'rxjs';

// Import Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
// Import Services
import { RoleService } from './../../../../../../core/services/role.service';

// Import Models
import { RoleInterface } from './../../../../../../core/models/role.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
  ],
  templateUrl: './role-permissions.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolePermissionsPage implements OnInit {
  role$!: Observable<RoleInterface>;

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.role$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        return this.roleService.getRoleById(id);
      })
    );
  }

  updatePermission(
    role: RoleInterface,
    permissionId: string,
    isChecked: boolean
  ) {
    // Implement the logic to update the role's permissions
    // This might involve calling a method on the roleService to update the role
  }
}
