import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
    name = '';
    subject = '';
    message = '';
    receiverMail = 'vemanajayakrishnachandra@gmail.com';
  
    openGmail() {
      const subject = encodeURIComponent(this.subject);
      const body = encodeURIComponent(
        `Name: ${this.name}\nMessage: ${this.message}`
      );

      
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${this.receiverMail}&su=${subject}&body=${body}`,
        '_blank'
      );
    }
  }
