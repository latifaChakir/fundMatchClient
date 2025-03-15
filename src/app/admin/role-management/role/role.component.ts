import {Component, OnInit} from '@angular/core';
import {Observable, take} from "rxjs";
import {Store} from "@ngrx/store";
import {Role} from "../../../core/models/auth/Register-request.model";
import {selectFilteredRoles, selectRoles} from "../../../core/stores/role/role.reducer";
import {RoleActions} from "../../../core/stores/role/role.actions";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit{
  p: number = 1;
  showModal = false;
  roles$: Observable<Role[]>;
  selectedRole: Role | null = null;
  visible: boolean = false;
  roleIdToDelete: number | null = null;
  constructor(private store: Store) {
    this.roles$ = this.store.select(selectFilteredRoles);
  }
  ngOnInit() {
    this.store.dispatch(RoleActions.loadRoles());
  }
  closePopup(): void {
    this.showModal = false;
    this.selectedRole = null;
  }
  openPopup() : void{
    this.showModal = true;
  }
  editRole(roleId: number): void {
    this.store.dispatch(RoleActions.getRoleById({ id: roleId }));
    this.store.select(selectRoles).pipe(
      take(1)
    ).subscribe(roles => {
      const roleToEdit = roles.find(role => role.id === roleId);
      if (roleToEdit) {
        this.selectedRole = roleToEdit;
        this.openPopup();
      }
    });
  }

  showDeleteConfirmation(id: number) {
    this.roleIdToDelete = id;
    this.visible = true;
  }

  confirmDeleteRole() {
    if (this.roleIdToDelete !== null) {
      this.store.dispatch(RoleActions.deleteRole({ id: this.roleIdToDelete }));
    }
    this.visible = false;
  }

  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(RoleActions.filterRoles({ searchTerm: value }));
  }
}
