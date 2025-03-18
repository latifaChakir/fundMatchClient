import { Component, OnInit } from '@angular/core';
import { ZoomService } from "../../core/services/zoom/zoom.service";
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  meetingDetails: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: []
  };

  constructor(private zoomService: ZoomService) {}

  ngOnInit() {
    this.getMeetingDetails();
  }

  getMeetingDetails() {
    this.zoomService.getMyMeetings().subscribe((response: any) => {
      this.meetingDetails = response;
      this.populateCalendar();
    });
  }

  populateCalendar() {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: this.meetingDetails.map(meeting => ({
        id: meeting.id.toString(),
        title: meeting.topic,
        start: meeting.startTime,
        url: meeting.joinUrl
      }))
    };
  }
}
