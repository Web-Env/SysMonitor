import { ChangeDetectorRef, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { fan } from "src/app/models/fan.model";
import { FanComponent } from './fan/fan.component';

@Component({
    selector: 'app-fans-container',
    templateUrl: './fans-container.component.html',
    styleUrls: ['./fans-container.component.scss']
})
export class FansContainerComponent implements OnInit {
    @Input() fans: Array<fan> = [];
    
    @ViewChildren(FanComponent)
    fanComponents!: QueryList<FanComponent>;

    constructor() { }

    ngOnInit(): void {
    }
}
