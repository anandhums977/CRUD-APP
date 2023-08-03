import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { PostService } from 'src/app/services/post/post.service';
import { IPost } from 'src/app/shared/interface/post/post';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  postId: any;
  isUpdate: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {


    this.initForm();
    this.route.url.subscribe((segments) => {
      if (segments[0]?.path === 'edit') {
        this.postId = this.route.snapshot.paramMap.get('id');
        this.isUpdate = true;
        this.loadPostData(this.postId);

      }

    })
  }

  private initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      userId: ['', Validators.required],
      tags: [[]],
      reactions: ['', Validators.required]
    });
  }


  onSubmit() {
    this.spinner.show();
    this.fillTagsArray()
    if (this.postForm.valid) {
      if (this.postId !== undefined) {
        this.postService.updatePost(this.postId, this.postForm.value).subscribe((data) => {
          this.spinner.hide();
          this.toastr.success('Success', 'Post Updated Successfully!');
          this.postForm.reset()
        },
          (error) => {
            this.spinner.hide();
            this.toastr.error('Error', 'Error Occured while Updating Post!');
          });

      }
      else {
        this.postService.createPost(this.postForm.value).subscribe((data) => {
          this.spinner.hide();
          this.toastr.success('Success', 'Post Added Successfully!');
          this.postForm.reset()
        },
          (error) => {
            this.spinner.hide();
            this.toastr.error('Error', 'Error Occured while Adding Post!');
          });
      }
    }
  }


  fillTagsArray() {
    const tagsControl = this.postForm.get('tags');
    if (tagsControl?.value.length && !Array.isArray(tagsControl?.value)) {
      const tagsArray = tagsControl.value.split(',');
      tagsControl.setValue(tagsArray);
    }
  }


  loadPostData(id: string) {
    this.postService.getSinglePost(id).subscribe((data: IPost) => {
      this.postForm.patchValue(data);
    })
  }


}
