import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createRoleValidator} from "../../../core/validators/role/role-validators";
import {RoleActions} from "../../../core/stores/role/role.actions";
import {Role} from "../../../core/models/auth/Register-request.model";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit{
  @Output() closePopup = new EventEmitter<void>();
  @Output() openPopup = new EventEmitter<void>();
  @Input() initialRequestData: Role | null = null;
  roleForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) { }
  ngOnInit() {
    this.roleForm = createRoleValidator(this.fb);
    if (this.initialRequestData) {
      this.roleForm.patchValue(this.initialRequestData);
    }
  }
  onSubmit() {
    const formValues = this.roleForm.getRawValue();
    const role : Role = {
      id: this.initialRequestData ? this.initialRequestData.id : undefined,
      name : formValues.name,
    }
    if (this.initialRequestData) {
      this.store.dispatch(RoleActions.updateRole({ role }));
    }else {
      this.store.dispatch(RoleActions.addRole({ role }));
    }
    this.roleForm.reset();
    this.cancel();
    this.initialRequestData = null;
  }

  cancel(): void {
    this.closePopup.emit();
  }
}
