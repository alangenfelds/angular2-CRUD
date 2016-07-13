System.register(['angular2/core', "./users.service"], function(exports_1, context_1) {
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
    var core_1, users_service_1;
    var UsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            UsersComponent = (function () {
                function UsersComponent(_usersService) {
                    this._usersService = _usersService;
                    this.users = [];
                }
                UsersComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._usersService.getUsers()
                        .subscribe(function (users) { return _this.users = users; });
                };
                UsersComponent.prototype.deleteUser = function (user) {
                    var _this = this;
                    if (confirm("Are you sure you want to delete " + user.name + "?")) {
                        var index = this.users.indexOf(user);
                        // Here, with the splice method, we remove 1 object
                        // at the given index.
                        this.users.splice(index, 1);
                        this._usersService.deleteUser(user.id)
                            .subscribe(null, function (err) {
                            alert("Could not delete the user.");
                            // Revert the view back to its original state
                            // by putting the user object at the index
                            // it used to be.
                            _this.users.splice(index, 0, user);
                        });
                    }
                };
                UsersComponent = __decorate([
                    core_1.Component({
                        template: "\n            <h2>Users</h2>\n            <p>\n            <a class=\"btn btn-primary\" href=\"/users/new\">Add User</a>\n            </p>\n            <table class=\"table table-bordered\">\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Email</th>\n                        <th>Edit</th>\n                        <th>Delete</th>\n                    </tr>\n                </thead>      \n                <tr *ngFor=\"#user of users\">\n                    <td>{{user.name}}</td>\n                    <td>{{user.email}}</td>\n                    <td><a href=\"/users/{{user.id}}\"><i class=\"glyphicon glyphicon-edit\"></i></a></td>\n                    <td><i class=\"glyphicon glyphicon-remove\" (click)=\"deleteUser(user)\"></i></td>\n                </tr>\n            </table>\n",
                        providers: [users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [users_service_1.UsersService])
                ], UsersComponent);
                return UsersComponent;
            }());
            exports_1("UsersComponent", UsersComponent);
        }
    }
});
//# sourceMappingURL=users.component.js.map