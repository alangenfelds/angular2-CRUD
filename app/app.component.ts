import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router'

import {NavBarComponent} from "./navbar.component";
import {HomeComponent} from "./home.component";
import {UsersComponent} from "./users.component";
import {PostsComponent} from "./posts.component";
import {AddUserComponent} from "./adduser.component";
import {EditUserComponent} from "./edituser.component";
import {UserFormComponent} from "./user-form.component";
import {NotFoundComponent} from "./not-found.component";


@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true},
    {path: '/users', name: 'Users', component: UsersComponent},
    {path: '/users/new', name: 'AddUser', component: UserFormComponent},
    {path: '/users/:id', name: 'EditUser', component: UserFormComponent},
    {path: '/posts', name: 'Posts', component: PostsComponent},
    {path: '/not-found', name: 'NotFound', component: NotFoundComponent},
    {path: '/*other', name: 'Other', redirectTo: ['Home']}
])
@Component({
    selector: 'my-app',
    template: `
                <navbar></navbar>
                <div class="container">
                    <router-outlet></router-outlet>
                </div>
        `,
    directives: [ROUTER_DIRECTIVES, NavBarComponent]
})
export class AppComponent {
}