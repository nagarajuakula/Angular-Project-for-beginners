import { Component
} from '@angular/core';

@Component({
  selector: 'app-cust',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class CustomerDashboardComponent {
  title = 'server-blueprint';
  constructor() {
  }

  showPassword(event: string) {
    console.log('pas in app ' + event);
  }
  submit(value: any) {
    console.log('In App component' + value);
  }
}
