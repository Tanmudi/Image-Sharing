import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.css']
})
export class GallaryComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  imgArray : any;

  ngOnInit(): void {
    this.http.get(environment.apiBaseUrl + '/api/getImages').subscribe(
      res => { 
        this.imgArray = res;
        console.log(this.imgArray);
      },
      err => {}
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

  onDownload(data: any){
    this.userService.imgData = data;
    // console.log(this.userService.imgData);
    this.router.navigateByUrl('/download');
  }

}
