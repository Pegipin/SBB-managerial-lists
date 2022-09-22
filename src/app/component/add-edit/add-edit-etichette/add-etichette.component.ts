import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import Swal from "sweetalert2";

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
  selector: "app-add-etichette",
  templateUrl: "./add-etichette.component.html",
  styleUrls: ["./add-etichette.component.css"],
})
export class AddEtichetteComponent implements OnInit {
  id: any;
  disable: boolean = false;
  isEdit: boolean = false;
  buForm: FormGroup;
  tabEdit: PeriodicElement;
  codice: number;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private selfDialogRef: MatDialogRef<AddEtichetteComponent>
  ) {}

  ngOnInit() {
    console.log("tabedit", this.tabEdit);
    this.createForm();
    if (this.isEdit) {
      this.buForm.patchValue({
        ...this.buForm,
        ...this.tabEdit,
        id: this.tabEdit.id,
        codice: this.tabEdit.codice,
      });
    }
  }

  createForm() {
    this.buForm = this.formBuilder.group(
      {
        codice: ["", Validators.required],
      },
      { validators: [] }
    );
  }

  onSaveClick() {
    if (this.isEdit) {
      this.tabEdit = { ...this.tabEdit, ...this.buForm.value };
    } else {
      this.tabEdit.id = this.codice;
    }
    let b = (this.tabEdit.codice = (this.buForm.get("codice").value as number)
      .toString()
      .padStart(2, "0"));
  }

  onCloseClick() {
    this.selfDialogRef.close();
  }

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
}
