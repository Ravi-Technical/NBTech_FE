import { Injectable } from '@angular/core'; 
import { DemoRequest } from './demo-modal.model';

@Injectable({ providedIn: 'root' })
export class DemoRequestService {
  async submit(request: DemoRequest, source?: string): Promise<void> {
    // TODO: replace with a real API call, e.g.
    // await firstValueFrom(this.http.post('/api/demo-requests', { ...request, source }));
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }
}