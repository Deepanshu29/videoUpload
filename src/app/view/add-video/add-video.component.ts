import { VideoService } from './../../service/video.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css'],
})
export class AddVideoComponent implements OnInit {
  public videos;
  constructor(private fb: FormBuilder, private video: VideoService) {}

  videoForm = this.fb.group({
    title: [''],
    desc: [''],
    owner: [''],
  });
  ngOnInit(): void {}

  selectedVideo(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      this.videos = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('video', this.videos);
    console.log(this.videoForm.value);
    formData.append('videoTitle', this.videoForm.value.title);
    formData.append('videoDesc', this.videoForm.value.desc);
    formData.append('videoOwnerName', this.videoForm.value.owner);
    this.video.postVideo(formData).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
