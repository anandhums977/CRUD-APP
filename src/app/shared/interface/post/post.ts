export interface IPost {
    _id: string;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
}


export interface IPostsData {
    posts: IPost[];
    total: number;
    skip: number;
    limit: number

};