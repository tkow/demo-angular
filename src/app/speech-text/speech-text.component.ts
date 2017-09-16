import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import { HttpClient } from '@angular/common/http';
// import { EffectProviderBusService } from '../effect-provider-bus.service'

@Component({
  selector: 'app-speech-text',
  templateUrl: './speech-text.component.html',
  styleUrls: ['./speech-text.component.css']
})
export class SpeechTextComponent implements OnInit {

  private isRecording = false
  private recognizeStream = null
  // private keywords = {
  //   // '徐々に' : 'jojoni',
  //   // '海賊' : 'kaizoku',
  //   // 'ありがとう' : 'spark'
  // };

  constructor(private http: HttpClient,
     private detector: ChangeDetectorRef,
    //  private _effectService: EffectProviderBusService
  ) {
  }

  ngOnInit() {

  }
  getTokenAsync() {
    return this.http.get('/auth');
  }

  async handleMicClick() {
    if (this.recognizeStream) {
      this.stopRecognizeStream()
    } else if (!this.isRecording) {
    this.isRecording = true
    await this.getTokenAsync().subscribe(token => {
        this.startRecognizeStream(token['token']);
      })
    }
  }

  startRecognizeStream(token) {
    const stream = recognizeMicrophone({
      token,
      model: 'ja-JP_BroadbandModel',
      objectMode: true,
      extractResults: true,
      // keywords: Object.keys(this.keywords),
      // keywords_threshold: 0.7,
    });
    stream.on('data', data => {
      if (data.final) {
        const transcript = data.alternatives[0].transcript;
        console.log(transcript)
      }
    });
    this.recognizeStream = stream
  }
  stopRecognizeStream() {
    if (this.recognizeStream) {
      this.recognizeStream.stop()
      this.recognizeStream.removeAllListeners()
    }
    this.isRecording = false
    this.recognizeStream = null
  }

}
