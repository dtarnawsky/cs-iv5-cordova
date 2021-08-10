import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  async ngOnInit() {
    const data = await Device.getAvailableHardware();
    alert(JSON.stringify(data));
  }

}
