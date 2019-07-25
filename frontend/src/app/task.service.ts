import { Injectable } from '@angular/core';
import {WebrequestService} from './webrequest.service';
import { Task } from 'src/app/models/task.models';

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

  createTask(title:String,listId:String){
    return this.webReqService.post(`lists/${listId}/tasks`,{title})
  }  

  complete(task:Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    })
  }
}
