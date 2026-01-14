import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideoCall } from "./video-call/video-call";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, VideoCall],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angularwebrtcsocketio');
}
