//noinspection TypeScriptCheckImport
import {Component, OnInit} from 'angular2/core'
import {PostsService} from "./posts.service";
import {SpinnerComponent} from "./spinner.component";
import {Post} from "./post";
import {UsersService} from "./users.service";
import {PaginationComponent} from "./pagination.component";

@Component ({
    template: `
            <style>
                .posts li { cursor: default;}
                .posts li:hover { background: #ecf0f1;}
                .list-group-item.active,
                .list-group-item.active:hover,
                .list-group-item.active:focus {
                    background-color: #ecf0f1;
                    border-color: #ecf0f1;
                    color: #2c3e50;
                }
                
            </style>
            <h1>Posts</h1>
           <div class="row">
            <div class="col-md-6">
             <select #u (change)="filterByUser({ userId: u.value })" class="form-control">
                <option selected value="">Select a user...</option>
                <option *ngFor="#user of users" value="{{user.id}}">{{user.name}}</option>
            </select>
                <spinner *ngIf="postsLoading"></spinner>
                 <pagination [items]="posts" (page-changed)="onPageChanged($event)"></pagination>
                <ul class="list-group posts">
                    <!--<li class="list-group-item" [class.active]="selectedPost == post" *ngFor="#post of posts" (click)="onSelect(post)">-->
                     <li *ngFor="#post of pagedPosts" class="list-group-item" [class.active]="selectedPost == post" (click)="onSelect(post)">
                       {{post.title}}
                    </li>
                </ul>
            </div>
             <div class="col-md-6">
                <div class="panel panel-default" *ngIf="selectedPost">
                    <div class="panel-heading">
                        <h3 class="panel-title">{{selectedPost.title}}</h3>
                    </div>
                    <div class="panel-body">
                       {{selectedPost.body}}
                    </div>
                    <spinner *ngIf="commentsLoading"></spinner>
                        <div class="media" *ngFor="#comment of comments">
                          <div class="media-left">
                            <a href="#">
                              <img class="media-object thumbnail" src="http://lorempixel.com/80/80/people?random={{comment.id}}" alt="..." style="border-radius: 100%">
                            </a>
                          </div>
                          <div class="media-body">
                            <h4 class="media-heading">{{comment.name}}</h4>
                           {{comment.body}}
                          </div>
                       </div>
                </div>
              </div>
           </div>
`,
    providers: [PostsService, UsersService],
    directives: [SpinnerComponent,PaginationComponent]
})

export class PostsComponent implements OnInit{

    selectedPost;
    posts = [];
    pagedPosts = [];
    comments = [];
    users=[];

    postsLoading;
    commentsLoading;

    pageSize = 10;

    constructor(private _postsService: PostsService, private _usersService: UsersService){}

    ngOnInit():any {
        this.loadUsers();
        this.loadPosts();
    }

    private loadUsers(){
        this._usersService.getUsers()
            .subscribe(users => this.users = users)
    }

    private loadPosts(filter?){
        this.postsLoading = true;
        this._postsService.getPosts(filter)
            .subscribe(
                posts => {
                    this.posts = posts,
                    this.pagedPosts = _.take(this.posts, this.pageSize)
                    },
                    null,
                    () => { this.postsLoading = false; }
            );
    }

    onSelect(post: Post){
        this.selectedPost = post;
        this.commentsLoading=true;
        
        this._postsService.getComments(+post.id)
            .subscribe(
                comments => this.comments = comments,
                null,
                () => {this.commentsLoading = false;}
            )

    }

    // filterByUser(id){
    //     this.selectedPost = null;
    //     this.postsLoading = true;
    //     this._postsService.getPostsByUser(id)
    //         .subscribe(res => {
    //             this.posts = res
    //             this.postsLoading = false;
    //         })
    // }

    filterByUser(filter){
        this.selectedPost = null;
        this.loadPosts(filter);
    }

    onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
    }


}