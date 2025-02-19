import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Sector } from "../../../core/models/sector/sector.model";
import {Observable, Subject, take} from "rxjs";
import {selectFilteredSectors, selectSectors} from "../../../core/stores/sector/sector.reducer";
import { SectorActions } from "../../../core/stores/sector/sector.actions";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css'],
})
export class SectorComponent implements OnInit, OnDestroy {
  showModal = false;
  sectors$: Observable<Sector[]>;
  sectors: Sector[] = [];
  displayedSectors: Sector[] = [];
  selectedSector: Sector | null = null;
  visible: boolean = false;
  sectorIdToDelete: number | null = null;

  itemsPerPage: number = 3;
  currentPage: number = 1;

  private unsubscribe$ = new Subject<void>();

  constructor(private store: Store) {
    this.sectors$ = this.store.select(selectFilteredSectors);
  }

  ngOnInit() {
    this.loadSectors();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get totalPages(): number {
    return Math.ceil(this.sectors.length / this.itemsPerPage);
  }

  loadSectors() {
    this.store.dispatch(SectorActions.loadSectors());

    this.sectors$.pipe(takeUntil(this.unsubscribe$)).subscribe(sectors => {
      this.sectors = sectors;
      this.updateDisplayedSectors();
    });
  }

  updateDisplayedSectors() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedSectors = this.sectors.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedSectors();
  }

  closePopup(): void {
    this.showModal = false;
    this.selectedSector = null;
  }

  openPopup(): void {
    this.showModal = true;
  }
  editSector(sectorId: number): void {
    this.store.dispatch(SectorActions.getSectorById({ id: sectorId }));
    this.store.select(selectSectors).pipe(take(1)).subscribe(sectors => {
      const sectorToEdit = sectors.find(sector => sector.id === sectorId);
      if (sectorToEdit) {
        this.selectedSector = sectorToEdit;
        this.openPopup();
      }
    });
  }

  showDeleteConfirmation(id: number) {
    this.sectorIdToDelete = id;
    this.visible = true;
  }

  confirmDeleteSector() {
    if (this.sectorIdToDelete !== null) {
      this.store.dispatch(SectorActions.deleteSector({ id: this.sectorIdToDelete }));
    }
    this.visible = false;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedSectors();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedSectors();
    }
  }
  onSearchChange(event: any) {
    const value = event.target.value;
    this.store.dispatch(SectorActions.filterSectors({ searchTerm: value }));
  }
}
