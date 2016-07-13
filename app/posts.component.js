System.register(['angular2/core', "./posts.service", "./spinner.component", "./users.service", "./pagination.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, posts_service_1, spinner_component_1, users_service_1, pagination_component_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (posts_service_1_1) {
                posts_service_1 = posts_service_1_1;
            },
            function (spinner_component_1_1) {
                spinner_component_1 = spinner_component_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postsService, _usersService) {
                    this._postsService = _postsService;
                    this._usersService = _usersService;
                    this.posts = [];
                    this.pagedPosts = [];
                    this.comments = [];
                    this.users = [];
                    this.pageSize = 10;
                }
                PostsComponent.prototype.ngOnInit = function () {
                    this.loadUsers();
                    this.loadPosts();
                };
                PostsComponent.prototype.loadUsers = function () {
                    var _this = this;
                    this._usersService.getUsers()
                        .subscribe(function (users) { return _this.users = users; });
                };
                PostsComponent.prototype.loadPosts = function (filter) {
                    var _this = this;
                    this.postsLoading = true;
                    this._postsService.getPosts(filter)
                        .subscribe(function (posts) {
                        _this.posts = posts,
                            _this.pagedPosts = _.take(_this.posts, _this.pageSize);
                    }, null, function () { _this.postsLoading = false; });
                };
                PostsComponent.prototype.onSelect = function (post) {
                    var _this = this;
                    this.selectedPost = post;
                    this.commentsLoading = true;
                    this._postsService.getComments(+post.id)
                        .subscribe(function (comments) { return _this.comments = comments; }, null, function () { _this.commentsLoading = false; });
                };
                // filterByUser(id){
                //     this.selectedPost = null;
                //     this.postsLoading = true;
                //     this._postsService.getPostsByUser(id)
                //         .subscribe(res => {
                //             this.posts = res
                //             this.postsLoading = false;
                //         })
                // }
                PostsComponent.prototype.filterByUser = function (filter) {
                    this.selectedPost = null;
                    this.loadPosts(filter);
                };
                PostsComponent.prototype.onPageChanged = function (page) {
                    var startIndex = (page - 1) * this.pageSize;
                    this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        template: "\n            <style>\n                .posts li { cursor: default;}\n                .posts li:hover { background: #ecf0f1;}\n                .list-group-item.active,\n                .list-group-item.active:hover,\n                .list-group-item.active:focus {\n                    background-color: #ecf0f1;\n                    border-color: #ecf0f1;\n                    color: #2c3e50;\n                }\n                \n            </style>\n            <h1>Posts</h1>\n           <div class=\"row\">\n            <div class=\"col-md-6\">\n             <select #u (change)=\"filterByUser({ userId: u.value })\" class=\"form-control\">\n                <option selected value=\"\">Select a user...</option>\n                <option *ngFor=\"#user of users\" value=\"{{user.id}}\">{{user.name}}</option>\n            </select>\n                <spinner *ngIf=\"postsLoading\"></spinner>\n                 <pagination [items]=\"posts\" (page-changed)=\"onPageChanged($event)\"></pagination>\n                <ul class=\"list-group posts\">\n                    <!--<li class=\"list-group-item\" [class.active]=\"selectedPost == post\" *ngFor=\"#post of posts\" (click)=\"onSelect(post)\">-->\n                     <li *ngFor=\"#post of pagedPosts\" class=\"list-group-item\" [class.active]=\"selectedPost == post\" (click)=\"onSelect(post)\">\n                       {{post.title}}\n                    </li>\n                </ul>\n            </div>\n             <div class=\"col-md-6\">\n                <div class=\"panel panel-default\" *ngIf=\"selectedPost\">\n                    <div class=\"panel-heading\">\n                        <h3 class=\"panel-title\">{{selectedPost.title}}</h3>\n                    </div>\n                    <div class=\"panel-body\">\n                       {{selectedPost.body}}\n                    </div>\n                    <spinner *ngIf=\"commentsLoading\"></spinner>\n                        <div class=\"media\" *ngFor=\"#comment of comments\">\n                          <div class=\"media-left\">\n                            <a href=\"#\">\n                              <img class=\"media-object thumbnail\" src=\"http://lorempixel.com/80/80/people?random={{comment.id}}\" alt=\"...\" style=\"border-radius: 100%\">\n                            </a>\n                          </div>\n                          <div class=\"media-body\">\n                            <h4 class=\"media-heading\">{{comment.name}}</h4>\n                           {{comment.body}}\n                          </div>\n                       </div>\n                </div>\n              </div>\n           </div>\n",
                        providers: [posts_service_1.PostsService, users_service_1.UsersService],
                        directives: [spinner_component_1.SpinnerComponent, pagination_component_1.PaginationComponent]
                    }), 
                    __metadata('design:paramtypes', [posts_service_1.PostsService, users_service_1.UsersService])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map