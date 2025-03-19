import { Component, OnInit } from '@angular/core';
import { UserService } from "../../core/services/user/user.service";
import { UserRequest } from "../../core/models/user/userRequest.model";
import {User} from "../../core/models/user/user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user?: User;
  editUser: UserRequest = { firstName: '', lastName: '', email: '', phoneNumber: '' };
  editMode: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe({
      next: (user: User) => {
        this.user = user;
        this.editUser = { ...user }; // Copie des données pour édition
      },
      error: (err) => {
        console.error("Erreur lors de la récupération d'utilisateur :", err);
      }
    });
  }

  saveChanges() {
    this.userService.updateProfile(this.editUser).subscribe({
      next: (updatedUser: User) => {
        this.user = updatedUser;
        this.editMode = false;
      },
      error: (err) => {
        console.error("Erreur lors de la mise à jour du profil :", err);
      }
    });
  }

  cancelEdit() {
    this.editUser = { ...this.user! };
    this.editMode = false;
  }
}
