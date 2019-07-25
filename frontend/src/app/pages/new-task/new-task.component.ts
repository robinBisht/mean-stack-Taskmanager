import { Component, OnInit } from '@angular/core';
import {Task} from 'src/app/models/task.models'
import { TaskService } from 'src/app/task.service';
import { Router, ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId:String
  constructor(private taskService:TaskService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.listId = params['listId']
      }
    )
  }

  createTask(title:String){
    this.taskService.createTask(title,this.listId).subscribe((newTask:Task)=>{


      this.router.navigate(['../'],{relativeTo:this.route})
    })
  }
}
