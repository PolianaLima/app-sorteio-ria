import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentAppComponent } from './componentes/content-app/content-app.component';
import { CarrosselInfoComponent } from './componentes/carrossel-info/carrossel-info.component';
import { NumerosSorteioComponent } from './componentes/numeros-sorteio/numeros-sorteio.component';
import { TopoSiteComponent } from './shared/topo-site/topo-site.component';
import { CardCarrosselComponent } from './componentes/card-carrossel/card-carrossel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContentAppComponent,
    CarrosselInfoComponent,
    NumerosSorteioComponent,
    TopoSiteComponent,
    CardCarrosselComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
