import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-key-value-text',
    templateUrl: './key-value-text.component.html',
    styleUrls: ['./key-value-text.component.scss']
})
export class KeyValueTextComponent {
    @Input() keyText!: string;
    @Input() valueText!: string;

    constructor() { }
}
