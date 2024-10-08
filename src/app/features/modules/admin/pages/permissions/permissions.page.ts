import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RoleService } from './../../../../../core/services/role.service';
import { RoleInterface } from './../../../../../core/models/role.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {
  roles$!: Observable<RoleInterface[]>;

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.roles$ = this.roleService.getAllRoles();
  }
}
