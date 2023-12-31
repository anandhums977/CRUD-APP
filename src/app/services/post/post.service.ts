import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPost, IPostsData } from 'src/app/shared/interface/post/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl: string = environment.apiUrl;
  private readonly postDeleted: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  public readonly isPostDeleted$: Observable<boolean> =
    this.postDeleted.asObservable();

  constructor(private http: HttpClient) {}

  getAllPosts(limit: number, skip: number): Observable<IPostsData> {
    return this.http.get<IPostsData>(
      this.baseUrl + `/?limit=${limit}&skip=${skip}`
    );
  }

  createPost(postData: IPost): Observable<IPost> {
    let postBody = {
      posts: postData,
    };
    return this.http.post<IPost>(this.baseUrl + `/add`, postBody);
  }

  deletePost(postID: string): Observable<any> {
    return this.http
      .delete<any>(this.baseUrl + `/${postID}`)
      .pipe(tap(() => this.postDeleted.next(true)));
  }

  getSinglePost(postID: string): Observable<IPost> {
    return this.http
      .get<{ post: IPost }>(this.baseUrl + `/${postID}`)
      .pipe(map((response) => response.post));
  }

  updatePost(postID: string, postData: IPost): Observable<IPost> {
    return this.http.put<IPost>(this.baseUrl + `/update/${postID}`, postData);
  }
}
