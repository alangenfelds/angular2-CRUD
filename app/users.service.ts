import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import 'rxjs/add/operator/map'
import {User} from "./user";

@Injectable()
export class UsersService{
    private _url = "http://jsonplaceholder.typicode.com/users";
    
    constructor(private _http: Http){}
    
    getUsers(){
        return this._http.get(this._url)
            .map(res => res.json())
    }

    getUser(id){
        return this._http.get(this._url + "/" + id)
            .map(res => res.json())
    }

    createUser(user: User){
        console.log("Saving user", user);
        return this._http.post(this._url, JSON.stringify(user))
            .map(res => res.json());
    }

    updateUser(user: User, id: number){
        console.log("Updating user", user);
        return this._http.put(this._url + "/"+ id, JSON.stringify(user))
            .map(res => res.json());
    }

    deleteUser(userId){
        return this._http.delete(this._url + "/"+ userId)
            .map(res => res.json());
    }

}