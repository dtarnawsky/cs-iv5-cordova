import { Injectable } from '@angular/core';
import { BrowserVault, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  config: IdentityVaultConfig = {
    key: 'io.ionic.iv-test-cordova-4',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Both,
    lockAfterBackgrounded: 2,
    shouldClearVaultAfterTooManyFailedAttempts: false,
    customPasscodeInvalidUnlockAttempts: 10,
    unlockVaultOnLoad: false,
  };

  vault: Vault | BrowserVault;

  constructor(private platform: Platform) {
    this.init();
  }

  async init() {
    console.log('init');
    await this.platform.ready();
    this.vault = this.platform.is('cordova') ? new Vault(this.config) : new BrowserVault(this.config);
    console.log(`init platform ready. Cordova = ${this.platform.is('cordova')}`);
    this.vault.onLock(() => {
      console.log('Vault was locked');
    });
    this.vault.onUnlock(() => {
      console.log('Vault was unlocked');
    });
    this.vault.onError((err) => {
      console.log('Vault error', err);
    });
  }

  async lock() {
    console.log('lock started');
    await this.vault.lock();
    console.log('lock ended');
  }

  async unlock() {
    console.log('unlock started');
    await this.vault.unlock();
    console.log('unlock ended');
  }

  async setData(key: string, value: string): Promise<void> {
    await this.vault.setValue(key, value);
  }
}
