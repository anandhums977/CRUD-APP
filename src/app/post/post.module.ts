import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './components/add-post/add-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';

@NgModule({
  declarations: [AddPostComponent, SinglePostComponent, PostListComponent],
  imports: [CommonModule, PostRoutingModule],
})
export class PostModule {}
