import {Control, ControlGroup} from "angular2/common";

interface ValidationResult{
    [key:string]:boolean;
}

export class EmailValidators {

    static validEmailCheck(control: ControlGroup){
        var email = control.value;

        if (email == '')
            return null;

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email))
            return {validEmailCheck: true};

        return null;
    }

}