import {Component} from 'angular2/core'
import {ControlGroup, FormBuilder, Validators} from 'angular2/common'
import {EmailValidators} from "./emailValidators";
import {Router, CanDeactivate, ComponentInstruction, RouteParams} from 'angular2/router'
import {UsersService} from "./users.service";
import {User} from "./user";

@Component({
    templateUrl: '/app/user-form.component.html',
    providers: [UsersService]
})

export class UserFormComponent implements CanDeactivate{

    userForm : ControlGroup;
    title: string;
    //user = { address: {} };
    user = new User();

    constructor(
        fb: FormBuilder,
        private _router: Router,
        private _usersService: UsersService,
        private _routeParams: RouteParams
    ){
        this.userForm = fb.group({
            name: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                EmailValidators.validEmailCheck
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

    ngOnInit():any {

        var id = this._routeParams.get("id");

        this.title = id ? "Edit User" : "New User";

        if (!id)
            return;

        this._usersService.getUser(id)
            .subscribe(
            x => {
                console.log("Got user:", x);
                this.user = x;
            },
            response => {
                if (response.status == 404) {
                    this._router.navigate(['NotFound']);
                }
            })
    }

    onSubmit(){
        console.log("Save button pressed");

        var id = this._routeParams.get("id");

        if (!id)
            {
                this._usersService.createUser(this.userForm.value)
                    .subscribe(x => {
                        //this.userForm.markAsPristine();
                        this._router.navigate(['Users']);
                    })        
            } else {
            
                this._usersService.updateUser(this.userForm.value, +id)
                    .subscribe((x => {
                        //this.userForm.markAsPristine();
                        this._router.navigate(['Users']);
                    }))

            
        }
        
        

    }

    routerCanDeactivate(nextInstruction:ComponentInstruction, prevInstruction:ComponentInstruction):any {
        if (this.userForm.dirty)
            return confirm("You have unsaved changes. Are you sure?");

        return null;

    }
}