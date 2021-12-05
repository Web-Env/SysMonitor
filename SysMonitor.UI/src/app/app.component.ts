import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ipcRenderer } from 'electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'sysmonitor-ui';
    animationDuration = "1s";
    newAnimationDuration: string | null = null;
    private ipc!: typeof ipcRenderer;

    report = "";

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        // if (this.electronService.isElectronApp) {
        //     try {
                
        //         this.electronService.ipcRenderer.on("report", (event, data) => {
        //             this.report = data;
        //         });
        //     } catch (e) {
        //         throw e;
        //     }
        // } else {
        //     console.warn('App not running inside Electron!');
        // }
        // this.ipc = window.require('electron').ipcRenderer;

        // this.ipc.on("report", (event, data) => {
        //     this.report = data;
        //     this.changeDetectorRef.detectChanges();
        // });

        window.setInterval(() => {
            this.newAnimationDuration = this.getRandomInt(0.45, 1.7, 1).toString() + "s";
            console.log(this.newAnimationDuration)
        }, 10000);
    
        
        var el = document.getElementById('Shape_327_');
        var transitionEnd = this.whichTransitionEvent(el);
        console.log (el)
        console.log (transitionEnd)
        // el!.addEventListener("animationend", () => {
        //     console.log ("Animation End");
        // }, false);
        el!.onanimationiteration = () => {
            if (this.newAnimationDuration != null) {
                console.log ("Animation Restarted");
                this.animationDuration = this.newAnimationDuration;
                this.newAnimationDuration = null;
            }
        }
    }
    getRandomInt(min: number, max: number, decimalPlaces: number) {  
        var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);  // could be min or max or anything in between
        var power = Math.pow(10, decimalPlaces);
        return Math.floor(rand*power) / power;
    }

    whichTransitionEvent(el: any){
        var t;
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }
    
        for(t in transitions){
            if( el!.style[t] !== undefined ){
                return t;
            }
        }

        return null;
    }
}
