import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import Swal from "sweetalert2";

export interface lala {
  id: number;
  codice: string;
  description: string;

}

let ELEMENT_DATA: lala[] = [
  { id: 1, codice: "att-001", description: "attivita 1",  },
  { id: 2, codice: "att-002", description: "attivita 2", },
  { id: 3, codice: "att-003", description: "attivita 3",  },
  { id: 4, codice: "att-004", description: "attivita 4",  },
  { id: 5, codice: "att-005", description: "attivita 5",  },
  { id: 6, codice: "att-006", description: "attivita 6",  },
  { id: 7, codice: "att-007", description: "attivita 7",  },
  { id: 8, codice: "att-008", description: "attivita 8",  },
  { id: 9, codice: "att-009", description: "attivita 9",  },
];

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  id: any;
  disable: boolean = false;
  isEdit: boolean = false;
  buForm: FormGroup;
  tabEdit: lala;
  codice: number;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private selfDialogRef: MatDialogRef<AddComponent>
  ) {}

  ngOnInit() {
    console.log("tabedit", this.tabEdit);
     this.createForm();
    if (this.isEdit) {
     this.buForm.patchValue({...this.buForm,...this.tabEdit,
    id: this.tabEdit.id,
    codice: this.tabEdit.codice,

  });
   }

  }

  createForm() {
    this.buForm = this.formBuilder.group(
      {
        codice: new FormControl(null, Validators.required),
        description: new FormControl(null, Validators.required),
      }
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
