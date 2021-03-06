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
    var EditUserComponent;
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
            EditUserComponent = (function () {
                function EditUserComponent(fb, _router, _usersService, _routeParams) {
                    this._router = _router;
                    this._usersService = _usersService;
                    this._routeParams = _routeParams;
                    this.user = { address: {} };
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
                            zipCode: []
                        })
                    });
                }
                EditUserComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._usersService.getUser(this._routeParams.get("id"))
                        .subscribe(function (x) {
                        console.log("Got user:", x);
                        _this.user = x;
                    });
                };
                EditUserComponent.prototype.onSubmit = function () {
                    var _this = this;
                    console.log("Save button pressed");
                    this._usersService.createUser(this.userForm.value)
                        .subscribe(function (x) {
                        //this.userForm.markAsPristine();
                        _this._router.navigate(['Users']);
                    });
                };
                EditUserComponent.prototype.routerCanDeactivate = function (nextInstruction, prevInstruction) {
                    // console.log("next", nextInstruction);
                    // console.log("previous", prevInstruction);
                    if (this.userForm.dirty)
                        return confirm("You have unsaved changes. Are you sure?");
                    return null;
                };
                EditUserComponent = __decorate([
                    core_1.Component({
                        templateUrl: '/app/edituser.form.component.html',
                        providers: [users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, users_service_1.UsersService, router_1.RouteParams])
                ], EditUserComponent);
                return EditUserComponent;
            }());
            exports_1("EditUserComponent", EditUserComponent);
        }
    }
});
//# sourceMappingURL=edituser.component.js.map