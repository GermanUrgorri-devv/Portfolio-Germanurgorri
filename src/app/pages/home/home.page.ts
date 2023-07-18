import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonContent } from '@ionic/angular';
import emailjs,  { EmailJSResponseStatus, init } from '@emailjs/browser';
import { FormBuilder, Validators } from '@angular/forms';
//import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Use ViewChild to get a reference to the IonContent element in the template
  @ViewChild(IonContent, { static: false })
  content!: IonContent;

  public email?: String;
  public message?: String;
  public skillset: any;
  public portfolio: any;

  public isDarkMode = false;

  constructor(
    //private location: Location,
    private formBuilder: FormBuilder,
    private alertController: AlertController
    //private database: DatabaseService

  ) {
    //Coloca esto en alguna parte de tu constructor
    init("LimrGaKPs4SaimONU"); // esto inicializa EmailJS

  }

  public contactForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
  });

  // Method that allows scrolling to a specific element on the page
  public scrollTo(elementId: string) {
    let element = document.getElementById(elementId);
    if (element !== null) {
      let yOffset = element.offsetTop;
      this.content.scrollToPoint(0, yOffset, 1000);
    }
  }

  public mostrar(card: any) {
    console.log(card)
  }


  public switchTheme(event: any) {

    switch (event.detail.value) {
      case 'light':
        document.body.setAttribute('color-theme', 'light');
        this.isDarkMode = false;
        break;
      case 'dark':
        document.body.setAttribute('color-theme', 'dark');
        this.isDarkMode = true;
        break;
    }
  }

  ngOnInit() {

    //this.skillset = this.database.getSkillset()

    fetch('./assets/data/links.json').then(res => res.json())
    .then(json => {

      this.portfolio = json;
      console.log(this.portfolio)

    });

    fetch('./assets/data/skillset.json').then(res => res.json())
      .then(json => {

        this.skillset = json;

      });

      console.log(this.portfolio)
  }

  public formLoading = false;
  public onSubmit() {

    this.formLoading = true;
    const templateParams = {
      from_name: this.email,
      to_name: 'Germán',
      message: this.message + 'aa',
    };

    emailjs.send('service_qx5gh5i', 'template_stlpgdr', templateParams)
      .then(
        async (response) => {

          const alert = await this.alertController.create({
            header: 'Email sended!',
            buttons: ['OK'],
          });
      
          await alert.present();

          this.email =  "";
          this.message =  "";
          this.formLoading = false;

        },
        (err) => {
          console.log('Error al enviar el correo:', err);
          this.formLoading = false;
        }
      );
  }
}