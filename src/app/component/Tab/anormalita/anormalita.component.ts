import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MatTableDataSource } from "@angular/material";

import Swal from "sweetalert2";
import { AddAnormalitaComponent } from "../../add-edit/add-edit-anormalita/add-anormalita.component";


export interface PeriodicElement {
  id: number;
  codice: string;
  description: string;
  classe: string;
}

let ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, codice: "att-001", description: "attivita 1", classe: "A" },
  { id: 2, codice: "att-002", description: "attivita 2", classe: "A" },
  { id: 3, codice: "att-003", description: "attivita 3", classe: "A" },
  { id: 4, codice: "att-004", description: "attivita 4", classe: "A" },
  { id: 5, codice: "att-005", description: "attivita 5", classe: "A" },
  { id: 6, codice: "att-006", description: "attivita 6", classe: "A" },
  { id: 7, codice: "att-007", description: "attivita 7", classe: "A" },
  { id: 8, codice: "att-008", description: "attivita 8", classe: "A" },
  { id: 9, codice: "att-009", description: "attivita 9", classe: "A" },
];

@Component({
  selector: "app-anormalita",
  templateUrl: "./anormalita.component.html",
  styleUrls: ["./anormalita.component.css"],
})
export class AnormalitaComponent implements OnInit {
  id: number;
  codice:number;
  displayedColumns: string[] = [
    "edit",
    "codice",
    "description",
    "classe",
    "delete",
  ];
  filteredSearch: string;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  PeriodicElement: PeriodicElement[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onDelete(ELEMENT_DATA) {
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

  onClickAddAnormalita() {
    const dialogRef = this.dialog.open(AddAnormalitaComponent, {
      width: "40vw",
    });

    //  dialogRef.componentInstance.id = this.id;
  }

  onClickEditAnormalita(p: PeriodicElement) {
    const dialogRef = this.dialog.open(AddAnormalitaComponent, {
      //  this.list.map((data) => data.codice
      // data:{this.list.map((data) => data.codice)}
      data: {
        p,
      },
    });

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
