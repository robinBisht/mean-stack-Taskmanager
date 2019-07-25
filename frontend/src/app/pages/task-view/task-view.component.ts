import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute,Params } from '@angular/router';
import {Task} from '../../models/task.models'
import {List} from '../../models/list.model'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists:List[];
  tasks:Task[];
  selectedListId:String
  constructor(private taskService:TaskService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        console.log(params)
        this.taskService.getTasks(params.listId).subscribe((tasks:any[])=>{
          this.tasks = tasks
        })
      }
      
    )
    this.taskService.getLists().subscribe((lists:any[])=>{
      this.lists = lists
    })
  }

  onTaskClick(task:Task){
    this.taskService.complete(task).subscribe(()=>{
      console.log("Completed Successfully")
      task.completed = !task.completed
    })
  }

}
