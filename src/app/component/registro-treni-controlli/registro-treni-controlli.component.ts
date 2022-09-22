import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  MatDialog,
  MatSidenav,
  MatTableDataSource,
  PageEvent,
  MatIcon,
  MatTabChangeEvent,
} from "@angular/material";
import { Observable, pipe, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Swal, { SweetAlertResult } from "sweetalert2";


// export interface PeriodicElement {
//   id: number;
//   codice: string;
//   description: string;
//   classe: string;
// }

// let ELEMENT_DATA: PeriodicElement[] = [
//   { id: 1, codice: "att-001", description: "attivita 1", classe: "A" },
//   { id: 2, codice: "att-002", description: "attivita 2", classe: "A" },
//   { id: 3, codice: "att-003", description: "attivita 3", classe: "A" },
//   { id: 4, codice: "att-004", description: "attivita 4", classe: "A" },
//   { id: 5, codice: "att-005", description: "attivita 5", classe: "A" },
//   { id: 6, codice: "att-006", description: "attivita 6", classe: "A" },
//   { id: 7, codice: "att-007", description: "attivita 7", classe: "A" },
//   { id: 8, codice: "att-008", description: "attivita 8", classe: "A" },
//   { id: 9, codice: "att-009", description: "attivita 9", classe: "A" },
// ];

@Component({
  selector: "app-registro-treni-controlli",
  templateUrl: "./registro-treni-controlli.component.html",
  styleUrls: ["./registro-treni-controlli.component.css"],
})
export class RegistroTreniControlliComponent implements OnInit {
  selectedIndex: number = 0;
  // dataSource = ELEMENT_DATA;
  isShown: boolean = false ;
  isInputShown: boolean=false;

  constructor(public dialog: MatDialog,) {}

  ngOnInit() {


  }

  // onClickAdd() {
  //   const dialogRef = this.dialog.open(AddComponent, {
  //     width: "40vw",
  //   });

  //   //  dialogRef.componentInstance.id = this.id;
  // }


//   onTabClick(changeEvent: MatTabChangeEvent) {
//     console.log('Tab position: ' + changeEvent.tab.position);
//  }













// onTabClick(tabChangeEvent: MatTabChangeEvent): void {
//   this.selectedIndex = tabChangeEvent.index;
// }

// public nextStep() {
//   this.selectedIndex += 1;
// }

// public previousStep() {
//   this.selectedIndex -= 1;
// }
// onTabClick(){

//   this.isShown = ! this.isShown;

// }

}
