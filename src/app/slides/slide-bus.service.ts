import { Injectable } from '@angular/core';
import {SlidesService} from './slides.service';

@Injectable()
export class SlideBusService {
  private _callbacks = new Map<any, () => any>();

  constructor(private _slides: SlidesService) { }

  onOtherSlideOpen(previewComponent: any, cb: () => any) {
    this._callbacks.set(previewComponent, cb);
  }

  notifyOpen(previewComponent: any) {
    Promise.resolve().then(() => {
      this._callbacks.forEach((cb, cmp) => {
        if (previewComponent !== cmp) {
          cb();
        }
      });
    });
  }
}
