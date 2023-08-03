import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';
import { IPost } from 'src/app/shared/interface/post/post';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  postDetails!: IPost;
  detailPostID: any;

  constructor(private route: ActivatedRoute, private postService: PostService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
   this.detailPostID = params.get('id');
      this.postService.getSinglePost(this.detailPostID).subscribe((data: IPost) => {
        this.postDetails = data;
      })
      
    });
  }
}
