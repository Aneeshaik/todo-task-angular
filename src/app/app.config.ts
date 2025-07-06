import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideFirebaseApp(() => initializeApp({"projectId":"todo-project-2109b","appId":"1:610553028347:web:612ae0eb0862f6614d9a5e","storageBucket":"todo-project-2109b.firebasestorage.app","apiKey":"AIzaSyDmvmS7NCZrrAxF2uAGYQEf8_uiCSuRArM","authDomain":"todo-project-2109b.firebaseapp.com","messagingSenderId":"610553028347","measurementId":"G-X1JYLMDVJN"})), provideFirestore(() => getFirestore())]
};
