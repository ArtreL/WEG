import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LehrveranstaltungenService, Lehrveranstaltung } from './lehrveranstaltungen.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule {
  // forRoot allows to override providers
  // https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
  public static forRoot(): ModuleWithProviders {
      return {
          ngModule: ServicesModule,
          providers: [
            // Repository needs to be a singleton across the app
            // or else some components could see different lists
            Lehrveranstaltung
          ]
      };
  }
  constructor( @Optional() @SkipSelf() parentModule: ServicesModule) {
      if (parentModule) {
          throw new Error('ServicesModule is already loaded. Import it in the AppModule only');
      }
  }
}
