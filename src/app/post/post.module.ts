import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPostComponent } from './components/add-post/add-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostRoutingModule } from './post-routing.module';
import { PostCardComponent } from './components/post-card/post-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddPostComponent, SinglePostComponent, PostListComponent, PostCardComponent],
  imports: [CommonModule, PostRoutingModule,SharedModule,ReactiveFormsModule],
})
export class PostModule {}
