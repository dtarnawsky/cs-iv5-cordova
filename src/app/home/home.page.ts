import { Component, OnInit } from '@angular/core';
import { Device } from '@ionic-enterprise/identity-vault';
import { VaultService } from '../vault.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private vaultService: VaultService) { }

  async ngOnInit() {

  }

  async check() {
    try {
      await this.vaultService.setData('blar', 'stuff');
      await this.vaultService.lock();
      const data = await Device.getAvailableHardware();
      console.log('getAvailableHardware', JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }

  async unlock() {
    await this.vaultService.unlock();
  }

}
