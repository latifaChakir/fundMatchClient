import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Sector} from "../../../core/models/sector/sector.model";
import {Observable, take} from "rxjs";
import {selectSectors} from "../../../core/stores/sector/sector.reducer";
import {SectorActions} from "../../../core/stores/sector/sector.actions";

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css'
})
export class SectorComponent implements OnInit{
  showModal = false;
  sectors$: Observable<Sector[]>;
  selectedSector: Sector | null = null;

  constructor(private store: Store) {
    this.sectors$ =this.store.select(selectSectors);
  }
  ngOnInit() {
    this.store.dispatch(SectorActions.loadSectors());
  }

  closePopup(): void {
    this.showModal = false;
    this.selectedSector = null;
  }

  openPopup() : void{
    this.showModal = true;
  }
  editSector(sectorId: number): void {
    this.store.dispatch(SectorActions.getSectorById({ id: sectorId }));
    this.store.select(selectSectors).pipe(
      take(1)
    ).subscribe(sectors => {
      const sectorToEdit = sectors.find(sector => sector.id === sectorId);
      if (sectorToEdit) {
        this.selectedSector = sectorToEdit;
        this.openPopup();
      }
    });
  }

}
