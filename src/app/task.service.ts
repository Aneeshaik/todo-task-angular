import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string,
  title: string,
  description?: string,
  category?: string | undefined,
  completed: boolean,
  createdAt: Date
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksRef;
  constructor(private firestore: Firestore) {
    this.tasksRef = collection(this.firestore, 'tasks')
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.tasksRef, {idField: 'id'}) as Observable<Task[]>
  }

  addTask(task: Task){
    return addDoc(this.tasksRef, task);
  }

  deleteTask(id: string){
    const taskDoc =  doc(this.firestore, `tasks/${id}`);
    return deleteDoc(taskDoc)
  }

  toggleComplete(task: Task){
    console.log("updating task... ", task)
    console.log("Task id ", task.id, task.completed)
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    return updateDoc(taskDoc, {completed: !task.completed})
  }
}
