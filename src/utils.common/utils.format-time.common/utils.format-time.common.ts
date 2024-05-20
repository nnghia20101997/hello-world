import * as moment from "moment";

export class UtilsDate {
  static formatDateTimeVNToString(date: Date): string {
    return moment(date).format("DD/MM/YYYY h:mm");
  }

  static formatDateTimeInvoice(date: Date): string {
    return moment(date).format("YYYY-MM-DD");
  }

  static formatDateTimeVNToStringNoTime(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  }

  static formatDateVNToString(date: Date): string {
    return moment(date).format("DD/MM/YYYY");
  }

  static formatDateInsertDatabase(date: string): string {
    if (date == null || date == "") {
      return "";
    } else {
      return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    }
  }

  static formatStringDateToDate(date: string): Date {
    return new Date(this.formatDateInsertDatabase(date));
  }

  static convertDateFormat(inputDate: string): string {
    const dateParts = inputDate.split(/[-\/]/); // Tách chuỗi ngày tháng theo dấu "-" hoặc "/"
    const year = dateParts[2];
    const month = dateParts[1].length === 1 ? '0' + dateParts[1] : dateParts[1];
    const day = dateParts[0].length === 1 ? '0' + dateParts[0] : dateParts[0];
    return `${year}-${month}-${day}`;
  }
}
