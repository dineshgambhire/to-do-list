
import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task, User } from 'src/app/interfaces';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTaskForm!: FormGroup;
  currentUser!: User;
  toDoList!: Task[];
  task!: Task;

  constructor(private formBuilder: FormBuilder,
              private router: Router
    ) { }

  ngOnInit() {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['']
    });

    const currentUserString = localStorage.getItem("loggedInUser");
    if (currentUserString) {
      this.currentUser = JSON.parse(currentUserString);
    }
  }
 

  onSubmit() {
    // debugger;
    if (this.createTaskForm.valid) {
      const tasksString = localStorage.getItem("tasks");
      if (tasksString) {
        this.toDoList = JSON.parse(tasksString);
      } else {
        this.toDoList = [];
      }

      this.task.taskId = this.generateUniqueId();
      this.task.userId = this.currentUser.userId;
      this.task.title = this.createTaskForm.value.title;
      this.task.date = this.createTaskForm.value.date;
      this.task.description = this.createTaskForm.value.description;
      this.task.isImportant = false;
      this.task.isCompleted = false;
      this.task.createdOn = new Date();

      this.toDoList.push(this.task);
      localStorage.removeItem("tasks");
      localStorage.setItem("tasks",JSON.stringify(this.toDoList));
      alert("Task added successfully.");
      this.router.navigate(['/to-do-list']);
      
    } 
  }

  generateUniqueId(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    //padded with leading zeros using padStart() to ensure it has a fixed length of 6 digits.
    return timestamp + random;
  }
}
