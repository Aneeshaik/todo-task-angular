import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { Task, TaskService } from '../task.service';


@Component({
  selector: 'app-todo-lists',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatMenuModule],
  templateUrl: './todo-lists.component.html',
  styleUrl: './todo-lists.component.css'
})

export class TodoListsComponent implements OnInit {
  tasks: Task[] = [];
  originalTasks: Task[] = [];
  newTitle = '';
  newDescription = '';
  selectedCategory= '';
  idCounter = 1;
  selectedFilter= '';
  isDateSortSelected: boolean = false

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.originalTasks = [...data]
    })
  }

  filterByCategory(filterCategory: string){
    if(this.selectedFilter === filterCategory){
      this.selectedFilter = ''
      this.tasks = [...this.originalTasks];
      return
    }
    this.selectedFilter = filterCategory
    this.tasks = this.originalTasks.filter(task => task.category === filterCategory);
  }

  sortByDate() {
    this.isDateSortSelected = !this.isDateSortSelected
    this.tasks.sort((a,b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  selectCategory(category: string) {
    if(this.selectedCategory === category){
      this.selectedCategory = ''
      return
    }
    this.selectedCategory = category
  }

  addTask() {
    if(!this.newTitle.trim()) return;
    const newTask: Task = {
      title: this.newTitle.trim(),
      description: this.newDescription.trim(),
      category: this.selectedCategory,
      completed: false,
      createdAt: new Date()
    }
    this.taskService.addTask(newTask).then(() => {
      this.newTitle = '',
      this.newDescription = '',
      this.selectedCategory=''
      console.log("Added task ", this.tasks)
    })
  }

  toggleComplete(task: Task){
    this.taskService.toggleComplete(task)
  }

  deleteTask(id: string | undefined){
    if(!id) return
    this.taskService.deleteTask(id)
  }
}
