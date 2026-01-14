import { Component, OnInit } from '@angular/core';
import { MediaService } from '../services/media-service'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-call',
  imports: [CommonModule],
  templateUrl: './video-call.html',
  styleUrl: './video-call.css',
})
export class VideoCall implements OnInit{

  startCall() {
    this.WebrtcService.startCall();
    this.callInProgress=true;
  }
  acceptCall() {
    this.WebrtcService.acceptCall();
    this.incomingCall=false;
    this.callInProgress=true;
  }
  rejectCall() {
    this.WebrtcService.rejectCall();
    this.incomingCall=false;
    this.callInProgress=false;

    const remoteVideo = document.getElementById('remoteVideo')as HTMLVideoElement;

    if(remoteVideo){ 
      remoteVideo.srcObject=null;
    }
  }
  stopCall() {
    this.WebrtcService.stopCall();
    this.callInProgress=false;

    const localVideo = document.getElementById('localVideo')as HTMLVideoElement;

    if(localVideo){
      localVideo.srcObject=null;
    }
  }



  localStream! : MediaStream;
  incomingCall = false;
  callInProgress = false;

  constructor(private WebrtcService:MediaService){

  }

  async ngOnInit(): Promise<void> {

    try{
      this.localStream=await this.WebrtcService.initializeMedia();
      const localVideo = document.getElementById('localVideo')as HTMLVideoElement;
      if(localVideo) {
        localVideo.srcObject = this.localStream;
      }

      this.WebrtcService.incomingCall.subscribe(()=>this.incomingCall=true);
      this.WebrtcService.remoteStream.subscribe((remoteStream)=>{
        const remoteVideo = document.getElementById('remoteVideo')as HTMLVideoElement;
        if(remoteVideo){
          remoteVideo.srcObject=remoteStream;
        }
      });

    }catch(error){
      console.error('Error initializing media :',error);
    }


  }
}
