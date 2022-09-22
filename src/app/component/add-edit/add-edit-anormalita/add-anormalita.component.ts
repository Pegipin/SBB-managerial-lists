import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
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
  selector: "app-add-anormalita",
  templateUrl: "./add-anormalita.component.html",
  styleUrls: ["./add-anormalita.component.css"],
})
export class AddAnormalitaComponent implements OnInit {
  id: number;
  disable: boolean = false;
  isEdit: boolean = false;
  buForm: FormGroup;
  tabEdit: PeriodicElement;
  codice: number;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private selfDialogRef: MatDialogRef<AddAnormalitaComponent>
  ) {}

  ngOnInit() {
    console.log("tabedit", this.tabEdit);
    // this.initFormValues();
    this.createForm();
    if (this.isEdit) {
      this.buForm.patchValue({
        ...this.buForm,
        ...this.tabEdit,
        id: this.tabEdit.id,
        codice: this.tabEdit.codice,
        classe: this.tabEdit.classe,
      });
      //   }
    }
  }

  createForm() {
    // this.buForm = this.formBuilder.group(
    //   {
    //     // id:["", Validators.required],
    //     codice: ["", Validators.required],
    //     description: ["", Validators.required],
    //   },
    //   { validators: [] }
    // );
    this.buForm = new FormGroup({
      codice: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      classe: new FormControl(null, Validators.required),
    });
  }


  onSaveClick() {
    if (this.isEdit) {
      this.tabEdit = { ...this.tabEdit, ...this.buForm.value, id: this.id };
    } else {
      this.tabEdit.id = this.id;
      // this.tabEdit.classe = this.coclaseedice;//codice
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
