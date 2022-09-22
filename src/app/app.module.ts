import { AngularMaterialModule } from './modules/angular-material-module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from '../Http/interceptor';
import { DemoService } from '../Service/demo.service';
import { Context } from '../Service/DNN/context.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EtichetteComponent } from './component/Tab/etichette/etichette.component';
import { AnormalitaComponent } from './component/Tab/anormalita/anormalita.component';
import { IfserviceComponent } from './component/Tab/ifservice/ifservice.component';
import { ContestiComponent } from './component/Tab/contesti/contesti.component';
import { TipologiaComponent } from './component/Tab/tipologia/tipologia.component';
import { LocalitaComponent } from './component/Tab/localita/localita.component';
import { TipoAttivitaComponent } from './component/Tab/tipo-attivita/tipo-attivita.component';
import { ProvvedimentiComponent } from './component/Tab/provvedimenti/provvedimenti.component';
import { RegistroTreniControlliComponent } from './component/registro-treni-controlli/registro-treni-controlli.component';
import { AddComponent } from './component/add-edit/add-edit-attivita/add.component';
import { AddContestiComponent } from './component/add-edit/add-edit-contesti/add-contesti.component';
import { AddEtichetteComponent } from './component/add-edit/add-edit-etichette/add-etichette.component';
import { AddIfserviceComponent } from './component/add-edit/add-edit-fservice/add-ifservice.component';
import { AddProvvedimentiComponent } from './component/add-edit/add-edit-provvedimenti/add-provvedimenti.component';
import { AddLocalitaComponent } from './component/add-edit/add-edit-localita/add-localita.component';
import { AddTipologiaComponent } from './component/add-edit/add-edit-tipologia/add-tipologia.component';
import { AddAnormalitaComponent } from './component/add-edit/add-edit-anormalita/add-anormalita.component';

@NgModule({
  entryComponents: [
    TipoAttivitaComponent,EtichetteComponent,AnormalitaComponent,IfserviceComponent,ContestiComponent
  ,TipologiaComponent,LocalitaComponent,TipoAttivitaComponent,AddComponent, ProvvedimentiComponent,AddAnormalitaComponent
,AddContestiComponent,AddEtichetteComponent,AddIfserviceComponent,AddProvvedimentiComponent,
AddTipologiaComponent,EtichetteComponent,AnormalitaComponent,AddLocalitaComponent],
  declarations: [
    AppComponent,
    RegistroTreniControlliComponent,
    TipoAttivitaComponent,
    EtichetteComponent,
    AnormalitaComponent,
    ProvvedimentiComponent,
    IfserviceComponent,
    ContestiComponent,
    TipologiaComponent,
    LocalitaComponent,
    TipoAttivitaComponent,
    AddComponent,
    AddEtichetteComponent,
    AddAnormalitaComponent,
    AddProvvedimentiComponent,
    AddIfserviceComponent,
    AddContestiComponent,
    AddTipologiaComponent,
    EtichetteComponent,
    AnormalitaComponent,
    AddLocalitaComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule, // important - this changed in Angular 4.3
    AngularMaterialModule, ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    Context,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    DemoService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
