import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/services/post/post.service';
import { IPost, IPostsData } from 'src/app/shared/interface/post/post';
import { OnSameUrlNavigation, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
})
export class PostCardComponent implements OnInit {
  @Input() postDetails!: IPost;
  showFullContent = false;

  constructor(
    private postService: PostService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  deletePost(id: string): void {
    this.postService
      .deletePost(id)
      .pipe(
        finalize(() => {
          this.toastr.success('Success', 'Post Deleted Successfully!');
        })
      )
      .subscribe();
  }
}
