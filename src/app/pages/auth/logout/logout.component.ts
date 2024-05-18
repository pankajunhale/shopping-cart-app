import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from '../../../common/services/storage/local-storage-manager/local-storage-manager.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(
    private readonly router: Router,
    private readonly storageService: LocalStorageManagerService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  private init() {
    this.storageService.deleteAll();
    this.router.navigateByUrl("login")
  }
}
