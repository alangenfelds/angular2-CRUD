import {Component, OnInit} from 'angular2/core'
import {UsersService} from "./users.service";

@Component ({
    template: `
            <h2>Users</h2>
            <p>
            <a class="btn btn-primary" href="/users/new">Add User</a>
            </p>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>      
                <tr *ngFor="#user of users">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td><a href="/users/{{user.id}}"><i class="glyphicon glyphicon-edit"></i></a></td>
                    <td><i class="glyphicon glyphicon-remove" (click)="deleteUser(user)"></i></td>
                </tr>
            </table>
`,
    providers: [UsersService]

})

export class UsersComponent implements OnInit{


    users = [];

    constructor(private _usersService : UsersService){

    }

    ngOnInit() {
        this._usersService.getUsers()
            .subscribe(users => this.users = users);
    }

    deleteUser(user){
        if (confirm("Are you sure you want to delete " + user.name + "?")) {
            var index = this.users.indexOf(user);
            // Here, with the splice method, we remove 1 object
            // at the given index.
            this.users.splice(index, 1);

            this._usersService.deleteUser(user.id)
                .subscribe(null,
                    err => {
                        alert("Could not delete the user.");
                        // Revert the view back to its original state
                        // by putting the user object at the index
                        // it used to be.
                        this.users.splice(index, 0, user);
                    });
        }
    }

}