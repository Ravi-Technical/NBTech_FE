import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs'; 
import { DemoModalData, DemoRequest } from './demo-modal.model';
import { DemoModalComponent } from './demo-model/demo-modal.component';

@Injectable({ providedIn: 'root' })
export class DemoModalService {
  private readonly dialog = inject(MatDialog);

  /**
   * Opens the demo modal. The returned observable emits the submitted
   * request after a successful submit, or undefined if it was cancelled.
   */
  open(data: DemoModalData = {}): Observable<DemoRequest | undefined> {
    return this.dialog
      .open<DemoModalComponent, DemoModalData, DemoRequest>(DemoModalComponent, {
        data,
        width: '560px',
        maxWidth: '95vw',
        autoFocus: 'first-tabbable',
        panelClass: 'demo-modal-panel',
        restoreFocus: true,
      })
      .afterClosed();
  }
}