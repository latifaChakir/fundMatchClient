import {Component, OnInit} from '@angular/core';
import {ZoomService} from "../../core/services/zoom/zoom.service";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit{
  startTime: string = '';
  duration: number = 60;
  p: number = 1;
  showModal: boolean = false;
  meetingDetails: any = null;
  ngOnInit() {
    this.getMeetingDetails();
  }
  constructor(private zoomService: ZoomService) {}

  startMeeting() {
    if (!this.startTime || this.duration <= 0) {
      alert("Veuillez entrer une date et une durée valides.");
      return;
    }

    this.zoomService.createMeeting('Réunion Importante', this.startTime, this.duration)
      .subscribe((response: any) => {
        this.closeModal();
        this.getMeetingDetails();

      });
  }
  getMeetingDetails() {
    this.zoomService.getMyMeetings().subscribe((response: any) => {
      this.meetingDetails = response;
    })
  }
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }


}
