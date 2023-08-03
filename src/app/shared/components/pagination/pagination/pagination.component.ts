import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChanged = new EventEmitter<number>();
  maxDisplayedPages: number = 5
  lastPageNo!: number;
  constructor() { }

  ngOnInit(): void {

  }


  get otherPages(): number[] {
    const itemsPerPage = 6;
    const totalPagesToShow = Math.ceil(this.totalPages / itemsPerPage);
    const pages = [];
    for (let i = 2; i <= totalPagesToShow; i++) {
      pages.push(i);
    }

    return pages;
  }

  get lastPageNum(): number {
    const totalPages = Math.floor(this.totalPages / 6);
    const remainder = this.totalPages % 6;
    return remainder > 0 ? totalPages + 1 : totalPages;
  }


  get displayedPages(): number[] {
    const startIndex = Math.max(0, this.currentPage - 1);
    const endIndex = Math.min(startIndex + this.maxDisplayedPages - 1, this.otherPages.length - 1);
    return this.otherPages.slice(startIndex, endIndex + 1);
  }
  onPreviousClick() {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }

  onNextClick() {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }

  onPageClick(page: number) {

    this.pageChanged.emit(page);
    this.currentPage = page;
  }
}
