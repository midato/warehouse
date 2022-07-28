import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  parseDateToString(dataParam: Date): string {
    return moment(dataParam).format('YYYY-MM-DD');
  }

  parseStringToDate(stringParam: string): Date {
    return moment(stringParam, 'YYYY-MM-DD').toDate();
  }

  formatDateToStringYY_MM_DD_HH_mm_ss(dataParam: Date): string {
    return moment(dataParam).format('YYYY-MM-DD HH:mm:ss');
  }

  parseDateToGlobalFormat(dataParam: Date): string {
    return moment(dataParam).format('YYYY/MM/DD');
  }

  getHomeSelectedCurrency() {
    return localStorage.getItem('selcurr')!;
  }


}
