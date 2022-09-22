import { map } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef, MatTableDataSource } from "@angular/material";
import Swal from "sweetalert2";
import { AddComponent } from "../../add-edit/add-edit-attivita/add.component";



export interface lala {
  id: number;
  codice: string;
  description: string;
}

let ELEMENT_DATA: lala[] = [
  { id: 1, codice: "att-001", description: "attivita 1" },
  { id: 2, codice: "att-002", description: "attivita 2" },
  { id: 3, codice: "att-003", description: "attivita 3" },
  { id: 4, codice: "att-004", description: "attivita 4" },
  { id: 5, codice: "att-005", description: "attivita 5" },
  { id: 6, codice: "att-006", description: "attivita 6" },
  { id: 7, codice: "att-007", description: "attivita 7" },
  { id: 8, codice: "att-008", description: "attivita 8" },
  { id: 9, codice: "att-009", description: "attivita 9" },
];
@Component({
  selector: "app-tipo-attivita",
  templateUrl: "./tipo-attivita.component.html",
  styleUrls: ["./tipo-attivita.component.css"],
})
export class TipoAttivitaComponent implements OnInit {
  displayedColumns: string[] = ["edit", "codice", "description", "delete"];

  filteredSearch: string;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  id: number;
  codice:number;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  onClickAddTipoAttivita() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: "40vw",
    });

    //  dialogRef.componentInstance.id = this.id;

    dialogRef.afterClosed().subscribe((res) => {
      console.log("res", res);
    });
  }

  onDelete(ELEMENT_DATA: any) {
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
  onClickEdit(p: lala) {
    const dialogRef = this.dialog.open(AddComponent, {
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
