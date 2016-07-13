import {Component} from 'angular2/core'
import {ControlGroup, FormBuilder, Validators} from 'angular2/common'
import {EmailValidators} from "./emailValidators";
import {Router, CanDeactivate, ComponentInstruction} from 'angular2/router'
import {UsersService} from "./users.service";

@Component({
    templateUrl: '/app/adduser.form.component.html',
    providers: [UsersService]
})

export class AddUserComponent implements CanDeactivate{

    userForm : ControlGroup;

    constructor(fb: FormBuilder, private _router: Router, private _usersService: UsersService){
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

    onSubmit(){
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