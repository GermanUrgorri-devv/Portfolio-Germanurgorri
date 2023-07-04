import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Use ViewChild to get a reference to the IonContent element in the template
  @ViewChild(IonContent, { static: false })
  content!: IonContent;

  email?: String;
  message?: String;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    ) {}

  public contactForm = this.formBuilder.group({
    email: [''],
    message: [''],
  });

  // Method that allows scrolling to a specific element on the page
  scrollTo(elementId: string) {
    let element = document.getElementById(elementId);
    if (element !== null) {
      let yOffset = element.offsetTop;
      this.content.scrollToPoint(0, yOffset, 1000);
    }
  }

  ngOnInit() {

  

  }

  
}
