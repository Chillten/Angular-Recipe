import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyB_-G20NYnCKmnizwKeRGlV25yH_8zSxMY',
      authDomain: 'bogovich-angular-recipe.firebaseapp.com'
    });
  }
}
