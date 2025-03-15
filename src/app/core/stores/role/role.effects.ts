import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import {RoleService} from "../../services/role/role.service";
import {RoleActions} from "./role.actions";

@Injectable()
export class RoleEffects {
  constructor(private actions$: Actions, private roleService: RoleService) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.loadRoles),
      mergeMap(() =>
        this.roleService.getRoles().pipe(
          map((roles) => RoleActions.loadRolesSuccess({ roles })),
          catchError((error) => of(RoleActions.loadRolesFailure({ error: error.message })))
        )
      )
    )
  );

  getRoleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.getRoleById),
      mergeMap((action) =>
        this.roleService.getRoleById(action.id).pipe(
          map((role) => {
            return RoleActions.getRoleByIdSuccess({ role });
          }),
          catchError((error) => {
            return of(RoleActions.getRoleByIdFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.addRole),
      mergeMap((action) =>
        this.roleService.saveRole(action.role).pipe(
          map((role) => RoleActions.addRoleSuccess({role })),
          catchError((error) => of(RoleActions.addRoleFailure({ error: error.message })))
        )
      )
    )
  );


  updateRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.updateRole),
      mergeMap((action) => {
        const roleId = action.role.id;
        if (!roleId) {
          console.error("Role ID is not valid:", action.role);
          return of(RoleActions.updateRoleFailure({ error: "Invalid Role ID" }));
        }

        return this.roleService.updateRole(action.role, roleId).pipe(
          map((role) => RoleActions.updateRoleSuccess({ role })),
          catchError((error) => of(RoleActions.updateRoleFailure({ error: error.message })))
        );
      })
    )
  );

  deleteRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.deleteRole),
      mergeMap((action) =>
        this.roleService.deleteRole(action.id).pipe(
          map(() => RoleActions.deleteRoleSuccess({ id: action.id })),
          catchError((error) => of(RoleActions.deleteRoleFailure({ error: error.message })))
        )
      )
    )
  );
}
