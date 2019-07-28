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

  

  updateList(id:string,title:string){
    return this.webReqService.patch(`lists/${id}`,{title})
  }

  updateTask(listId:string,taskId:string,title:string){
    return this.webReqService.patch(`lists/${listId}/tasks/${taskId}`,{title})
  }

  deleteTask(listId:string,taskId:string){
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  complete(task:Task){
    return this.webReqService.patch(`lists/${task._listId}/tasks/${task._id}`,{
      completed: !task.completed
    })
  }
}
