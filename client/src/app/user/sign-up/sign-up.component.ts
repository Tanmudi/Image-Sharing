import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showSuccessMessage: boolean = false;
  serverErrorMessages: string="";
  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userService.postUser(form.value).subscribe(
      (res: any) => {
        this.showSuccessMessage = true;
        setTimeout(()=> this.showSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if(err.status === 422){
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else{
          this.serverErrorMessages = 'Something went wrong';
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      name: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
