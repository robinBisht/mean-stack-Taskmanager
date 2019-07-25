import { Injectable } from '@angular/core';
import {WebrequestService} from './webrequest.service'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebrequestService) { }

  getLists(){
    return this.webReqService.get('lists')
  }

  createList(title:String){
    return this.webReqService.post('lists',{title})
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
}
