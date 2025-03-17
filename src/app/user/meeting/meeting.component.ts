import { Component } from '@angular/core';
import {ZoomService} from "../../core/services/zoom/zoom.service";

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {
  constructor(private zoomService: ZoomService) {}

  startMeeting() {
    this.zoomService.createMeeting('Réunion Importante').subscribe((response: any) => {
      window.open(response.join_url, '_blank');
    });
  }
}
