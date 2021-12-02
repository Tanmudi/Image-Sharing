import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }


  ngOnInit(): void {
  }

  url="./assets/banner.jpg";
  imageUploadmsg: boolean = false;

  getfile : any ;

  onSelectedFile(event: any){
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (newEvent:any)=>{
        this.url=newEvent.target.result;
      }
    }
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.getfile = file;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('image', this.getfile);
    console.log(formData.get('image'));

    this.http.post(environment.apiBaseUrl + '/api/uploadFile', formData).subscribe(
      res =>{ 
        this.imageUploadmsg = true;
        setTimeout(()=> this.imageUploadmsg = false, 4000);

        console.log(res)},
      err =>{ console.log(err)}
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

}
