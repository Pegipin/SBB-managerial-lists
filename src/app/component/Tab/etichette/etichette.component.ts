import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MatTableDataSource } from "@angular/material";
import Swal from "sweetalert2";
import { AddEtichetteComponent } from "../../add-edit/add-edit-etichette/add-etichette.component";


export interface PeriodicElement {
  id: number;
  codice: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, codice: "att-001" },
  { id: 2, codice: "att-002" },
  { id: 3, codice: "att-003" },
  { id: 4, codice: "att-004" },
  { id: 5, codice: "att-005" },
  { id: 6, codice: "att-006" },
  { id: 7, codice: "att-007" },
  { id: 8, codice: "att-008" },
  { id: 9, codice: "att-009" },
];

@Component({
  selector: "app-etichette",
  templateUrl: "./etichette.component.html",
  styleUrls: ["./etichette.component.css"],
})
export class EtichetteComponent implements OnInit {
  displayedColumns: string[] = ["edit", "codice", "delete"];
  filteredSearch: string;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  id:number;
  codice:number;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onClickAddEttichette() {
    const dialogRef = this.dialog.open(AddEtichetteComponent, {
      width: "40vw",
    });

    //  dialogRef.componentInstance.id = this.id;

    dialogRef.afterClosed().subscribe((res) => {
      console.log("res", res);
    });
  }

  onDelete() {
    Swal.fire({
      // title: "Elimina Product " + this.getProductDescription(item.baseproduct),
      text: "Confermi di voler cancellare il dato? ",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "No, annulla eliminazione",
    });
  }

  onClickEditEtichette(p: PeriodicElement) {
    const dialogRef = this.dialog.open(AddEtichetteComponent, {
      //  this.list.map((data) => data.codice
      // data:{this.list.map((data) => data.codice)}
      data: {
        p,
      },
    });
    dialogRef.componentInstance.isEdit = true;
    dialogRef.componentInstance.tabEdit = {...p} ;
    dialogRef.componentInstance.isEdit = true;
    dialogRef.componentInstance.id = this.id;
    dialogRef.componentInstance.codice = this.codice;
    dialogRef.afterClosed().subscribe((res) => {
      console.log("res", res);
    });
  }
  onSearching() {
    this.loadList(this.filteredSearch);
  }
  loadList(filter: string) {
    this.dataSource.filter = filter.toLowerCase();
  }
}
