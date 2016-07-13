System.register(['angular2/core', 'angular2/common', "./emailValidators", 'angular2/router', "./users.service"], function(exports_1, context_1) {
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
    var core_1, common_1, emailValidators_1, router_1, users_service_1;
    var AddUserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (emailValidators_1_1) {
                emailValidators_1 = emailValidators_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            }],
        execute: function() {
            AddUserComponent = (function () {
                function AddUserComponent(fb, _router, _usersService) {
                    this._router = _router;
                    this._usersService = _usersService;
                    this.userForm = fb.group({
                        name: ['', common_1.Validators.required],
                        email: ['', common_1.Validators.compose([
                                common_1.Validators.required,
                                emailValidators_1.EmailValidators.validEmailCheck
                            ])],
                        phone: [],
                        address: fb.group({
                            street: [],
                            suite: [],
                            city: [],
                            zipcode: []
                        })
                    });
                }
                AddUserComponent.prototype.onSubmit = function () {
                    var _this = this;
                    console.log("Save button pressed");
                    // this._usersService.createUser({
                    //     name: this.userForm.find('name').value,
                    //     email: this.userForm.find('email').value,
                    //     phone: this.userForm.find('phone').value,
                    //     street: this.userForm.find('address').find('street').value,
                    //     suite: this.userForm.find('address').find('suite').value,
                    //     city: this.userForm.find('address').find('city').value,
                    //     zipCode: this.userForm.find('address').find('zipCode').value
                    // })
                    this._usersService.createUser(this.userForm.value)
                        .subscribe(function (x) {
                        //this.userForm.markAsPristine();
                        _this._router.navigate(['Users']);
                    });
                };
                AddUserComponent.prototype.routerCanDeactivate = function (nextInstruction, prevInstruction) {
                    // console.log("next", nextInstruction);
                    // console.log("previous", prevInstruction);
                    if (this.userForm.dirty)
                        return confirm("You have unsaved changes. Are you sure?");
                    return null;
                };
                AddUserComponent = __decorate([
                    core_1.Component({
                        templateUrl: '/app/adduser.form.component.html',
                        providers: [users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, users_service_1.UsersService])
                ], AddUserComponent);
                return AddUserComponent;
            }());
            exports_1("AddUserComponent", AddUserComponent);
        }
    }
});
//# sourceMappingURL=adduser.component.js.map