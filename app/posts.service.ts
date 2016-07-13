import {Injectable} from 'angular2/core'
import {Http} from 'angular2/http'
import 'rxjs/add/operator/map'
import {Post} from "./post";

@Injectable()
export class PostsService{
    private _url = "http://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http){}

    getPosts(filter?){
        var url = this._url;

        if (filter && filter.userId)
            url += "?userId=" + filter.userId

        return this._http.get(url)
            .map(res => res.json())
    }

    // getPostsByUser(id){
    //     if (id) {
    //         return this._http.get(this._url + "?userId=" + id)
    //             .map(res => res.json())
    //     } else {
    //         return this._http.get(this._url)
    //             .map(res => res.json())
    //     }
    // }

    getComments(id : number){
        return this._http.get(this._url + "/" + id +"/comments")
            .map(res => res.json())
    }
    
}