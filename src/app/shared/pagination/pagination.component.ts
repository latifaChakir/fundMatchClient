import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 2;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  currentPage: number = 1;
  totalPages: number = 0;

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }
}
