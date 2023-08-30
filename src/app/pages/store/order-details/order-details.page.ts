import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { SecurityUtil } from 'src/app/utils/Security.util';
import { StatusUtil } from 'src/app/utils/Status.util';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  public order: any = null;

  constructor(
    private route: ActivatedRoute,
    private service: DataService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('number');
    this.service
      .getOrder(id)
      .subscribe((data) => {
        this.order = data;
      })
  }

  isManager(): boolean {
    return SecurityUtil.isInRole('manager');
  }

  translateOrderStatus(status: string): string {
    return StatusUtil.convert(status);
  }

}
