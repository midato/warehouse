import { Injectable } from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
  }

  parseDateToString(dataParam: Date): string {
    // return moment(dataParam).format('YYYY-MM-DD');
    return moment(dataParam).format('DD/MM/YYYY');
  }

  parseStringToDate(stringParam: string): Date {
    return moment(stringParam, 'YYYY-MM-DD').toDate();
  }

  formatDateToStringYY_MM_DD_HH_mm_ss(dataParam: Date): string {
    return moment(dataParam).format('YYYY-MM-DD') + ' ' + moment(new Date(), 'HHmmss').format('HH:mm:ss');
  }

  parseDateToGlobalFormat(dataParam: Date): string {
    return moment(dataParam).format('YYYY-MM-DD HH:mm:ss');
  }

}
