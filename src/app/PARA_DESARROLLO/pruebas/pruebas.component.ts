import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export interface MenuIndex {
  menuIndex: number;
  submenuIndex: number;
}

export interface MenuItem {
  icon: string;
  text: string;
  value: string;
  subMenu: Array<{
    text: string;
    value: string;
  }>
}
@Component({
  selector: 'app-pruebas',
  templateUrl: './pruebas.component.html',
  styleUrls: ['./pruebas.component.css']
})
export class PruebasComponent implements OnInit {
  //TODO LO Q ESTA CONECTADO SIMULADA UN IFRAME DEL TIPO ANGULAR
  // name = 'Set iframe source';
  // url: string = "http://localhost:4200/admin/RegistroCalificacionDocente";
  // urlSafe: SafeResourceUrl;
  constructor(
    // public sanitizer: DomSanitizer
    ) { }


  ngOnInit(): void {
    // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }
  @Input()  public menuItems: Array<MenuItem> = [];
  @Output() public itemSelected = new EventEmitter<MenuIndex>();


  public onClick(event: MouseEvent, menuIndex: number, submenuIndex: number) {
    event.stopPropagation();
    this.itemSelected.emit({
      menuIndex: menuIndex,
      submenuIndex: submenuIndex
    });
  }
  public onItemSelected(menuIndex: MenuIndex) {
    document.location.assign(
      this.investmentClasses[menuIndex.menuIndex]
          .subMenu[menuIndex.submenuIndex].value
    );
  }


  ///
  public investmentClasses: MenuItem[] = [
    {
      icon: "euro_symbol",
      text: "currencies",
      value: "currency",
      subMenu: [
       {
         text: 'CAD',
         value: 'https://ca.finance.yahoo.com/quote/CADUSD=X/'
       },
       {
         text: 'USD',
         value: 'https://ca.finance.yahoo.com/quote/CAD%3DX?p=CAD%3DX'
       },
       {
         text: 'BTC',
         value: 'https://ca.finance.yahoo.com/quote/BTC-CAD/chart?p=BTC-CAD'
       }
     ]
    },
    {
      icon: "local_florist",
      text: "commodities",
      value: "commodity",
      subMenu: [
        {
          text: 'Coffee',
          value: 'https://ca.finance.yahoo.com/quote/KC%3DF/chart?p=KC%3DF'
        },
        {
          text: 'Oil',
          value: 'https://ca.finance.yahoo.com/quote/CL%3DF/chart?p=CL%3DF'
        },
        {
          text: 'Natural Gas',
          value: 'https://ca.finance.yahoo.com/quote/NG%3DF/chart?p=NG%3DF'
        }
      ]
    },
    {
      icon: "insert_chart",
      text: "indices",
      value: "index",
      subMenu: [
        {
          text: 'S&P500',
          value: 'https://ca.finance.yahoo.com/quote/%5EGSPC/chart?p=%5EGSPC'
        },
        {
          text: 'TSX',
          value: 'https://ca.finance.yahoo.com/quote/XIU.TO/chart?p=XIU.TO'
        },
        {
          text: 'DOW',
          value: 'https://ca.finance.yahoo.com/quote/%5EDJI/chart?p=%5EDJI'
        }
      ]
   },
   {
      icon: "business",
      text: "stocks",
      value: "stock",
      subMenu: [
        {
          text: 'APPL',
          value: 'https://ca.finance.yahoo.com/quote/AAPL/chart?p=AAPL'
        },
        {
          text: 'TSLA',
          value: 'https://ca.finance.yahoo.com/quote/TSLA/chart?p=TSLA'
        },
        {
          text: 'MSFT',
          value: 'https://ca.finance.yahoo.com/quote/MSFT/chart?p=MSFT'
        }
      ]
   }
 ];
}
