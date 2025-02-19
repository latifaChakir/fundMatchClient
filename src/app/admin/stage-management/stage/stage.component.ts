import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, take} from "rxjs";
import {Stage} from "../../../core/models/stage/stage.model";
import {StageActions} from "../../../core/stores/stage/stage.actions";
import {selectStages} from "../../../core/stores/stage/stage.reducer";
@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent implements OnInit{
  p: number = 1;
  showModal = false;
  Stages$: Observable<Stage[]>;
  selectedStage: Stage | null = null;
  visible: boolean = false;
  stageIdToDelete: number | null = null;
  constructor(private store: Store) {
    this.Stages$ =this.store.select(selectStages);
  }
  ngOnInit() {
    this.store.dispatch(StageActions.loadStages());
  }
  closePopup(): void {
    this.showModal = false;
    this.selectedStage = null;
  }
  openPopup() : void{
    this.showModal = true;
  }
  editStage(StageId: number): void {
    this.store.dispatch(StageActions.getStageById({ id: StageId }));
    this.store.select(selectStages).pipe(
      take(1)
    ).subscribe(Stages => {
      const StageToEdit = Stages.find(Stage => Stage.id === StageId);
      if (StageToEdit) {
        this.selectedStage = StageToEdit;
        this.openPopup();
      }
    });
  }

  showDeleteConfirmation(id: number) {
    this.stageIdToDelete = id;
    this.visible = true;
  }

  confirmDeleteSector() {
    if (this.stageIdToDelete !== null) {
      this.store.dispatch(StageActions.deleteStage({ id: this.stageIdToDelete }));
    }
    this.visible = false;
  }
}
