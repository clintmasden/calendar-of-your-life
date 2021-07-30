import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'cl-footer',
    templateUrl: './footer.component.html',
    styleUrls: []
})
export class FooterComponent implements OnInit {
    footerDate = new Date();

    constructor() { }

    ngOnInit() { }
}
