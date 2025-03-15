import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../core/models/user/user.model";
import {Store} from "@ngrx/store";
import {selectFilteredUsers} from "../../core/stores/user/user.reducer";
import {UserActions} from "../../core/stores/user/user.actions";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{
  users$: Observable<User[]>;
  p: number = 1;
  constructor(private store: Store) {
    this.users$ = this.store.select(selectFilteredUsers);
  }
  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());
  }
  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(UserActions.filterUsers({ searchTerm: value }));
  }

  exportToExcel(): void {
    this.users$.subscribe(users => {
      const dataToExport = users.map(user => ({
        Nom: user.firstName + ' ' + user.lastName,
        Email: user.email,
        Téléphone: user.phoneNumber,
        Rôle: user.roles?.length ? user.roles[0].name : 'N/A',
        Statut: user.isActive ? 'Active' : 'Suspendu',
      }));

      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Utilisateurs');

      const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, 'Utilisateurs.xlsx');
    });
  }

  blockUser(userId: number) {
    this.store.dispatch(UserActions.updateUserStatus({ userId }));
  }
  unBlockUser(userId: number) {
    this.store.dispatch(UserActions.unBlockUser({ userId }));
  }
}
