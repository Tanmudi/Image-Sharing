import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private http: HttpClient) { }

  getData = this.userService.imgData;

  fileSize = (this.getData.size)/1000;

  ngOnInit(): void {
    console.log(this.getData);
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/login');
  }

  returnBlob(res:any): Blob{
    console.log('file Downloaded');
    return new Blob([res], {type: 'image/jpeg'});
  }

  onDownload(id:any){
    // const params = new HttpParams().set('filename', x);
    this.userService.downloadFile(id).subscribe(
      res => {
        if(res){
          fileSaver.saveAs(this.returnBlob(res), id);
        }
        // console.log(true);
      },
      err => {
        console.log(err);
      }
    );
  }

}
