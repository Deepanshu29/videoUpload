import { VideoService } from './../../service/video.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public Display = [];

  constructor(private video: VideoService) {}

  ngOnInit(): void {
    this.video.getVideo().subscribe(
      (data) => {
        this.Display = data.videoInfo;
        console.log(this.Display);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
