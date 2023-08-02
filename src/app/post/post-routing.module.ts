import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { AddPostComponent } from './components/add-post/add-post.component';

const routes: Routes = [
  {
    path: 'post',
    children: [
      {
        path: '',
        component: PostListComponent,
      },
      {
        path: 'add',
        component: AddPostComponent,
      },
      {
        path: ':id',
        component: SinglePostComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
