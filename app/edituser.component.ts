import {Component, OnInit} from 'angular2/core'
import {ControlGroup, FormBuilder, Validators} from 'angular2/common'
import {EmailValidators} from "./emailValidators";
import {Router, CanDeactivate, ComponentInstruction, RouteParams} from 'angular2/router'
import {UsersService} from "./users.service";
import {User} from "./user";

@Component({
    templateUrl: '/app/edituser.form.component.html',
    providers: [UsersService]
})

export class EditUserComponent implements OnInit,CanDeactivate{

    user = { address: {} };

    userForm : ControlGroup;

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
                zipCode: []
            })
        });
    }

    ngOnInit():any {
        this._usersService.getUser(this._routeParams.get("id"))
            .subscribe(x => {
                console.log("Got user:", x);
                this.user = x;
            })
    }


    onSubmit(){
        console.log("Save button pressed");

        this._usersService.createUser(this.userForm.value)
            .subscribe(x => {
                //this.userForm.markAsPristine();
                this._router.navigate(['Users']);
            })

    }

    routerCanDeactivate(nextInstruction:ComponentInstruction, prevInstruction:ComponentInstruction):any {
        // console.log("next", nextInstruction);
        // console.log("previous", prevInstruction);
        if (this.userForm.dirty)
            return confirm("You have unsaved changes. Are you sure?");

        return null;

    }
}