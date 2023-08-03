import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostService } from 'src/app/services/post/post.service';
import { IPostsData, IPost } from 'src/app/shared/interface/post/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  limit: number = 6;
  skip: number = 0;
  posts: IPost[] = [];
  currentPage = 1;
  totalPages = 3;

  constructor(
    private postService: PostService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.postService.isPostDeleted$.subscribe({
      next: (isDeleted) => {
        if (isDeleted) this.fetchPosts(this.limit, this.skip);
      },
    });
    this.fetchPosts(this.limit, this.skip);
  }

  fetchPosts(limit: number, skip: number): void {
    this.spinner.show();
    this.postService.getAllPosts(limit, skip).subscribe((data: IPostsData) => {
      this.posts = data.posts;
      this.totalPages = data.total;
      this.spinner.hide();
    });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.skip = (this.currentPage - 1) * this.limit;
    this.fetchPosts(this.limit, this.skip);
  }
}
