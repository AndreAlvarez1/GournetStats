import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { ConectorService} from 'src/app/services/conector.service';
import { AlertController } from '@ionic/angular';
import { MemoriaService} from 'src/app/services/memoria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  @ViewChild('botonRut', {read: ElementRef}) botonRut;
  @ViewChild('cajaRut', {read: ElementRef}) cajaRut;
  @ViewChild('datosUsuario', {read: ElementRef}) datosUsuario;
  @ViewChild('botonDesaparecer', {read: ElementRef}) botonDesaparecer;

  public rut: any;
  public token: any;
  public rutOk: boolean;
  public mail: string;
  public password :string;
  public empresas: any;
  public empresa: any;

  constructor(private conector: ConectorService,
              public alertController: AlertController,
              public renderer: Renderer,
              public memoria: MemoriaService,
              private router: Router
              ) {
  }

  ngOnInit() {
    this.conector.traedatosGet("ventasdiarias/empresas/")
    .subscribe(data => console.log(data));
  };






   esconderBoton(){
     this.renderer.setElementStyle(this.cajaRut.nativeElement, 'display', 'none');
     this.renderer.setElementStyle(this.datosUsuario.nativeElement, 'left', '0');
   };

   izquierda(){
     this.renderer.setElementStyle(this.cajaRut.nativeElement, 'left', '-1000px');
   }


   validarRut(rut){
    console.log(rut);
    this.conector.traedatosGet(`ventasdiarias/empresa/${rut}`)
    .subscribe(datoEmpresa => {
                                console.log(datoEmpresa.Data);
                                this.memoria.empresa = datoEmpresa.Data;
                                this.traerLocales(this.memoria.empresa.Tabla)
                                this.izquierda();
                                setTimeout(this.esconderBoton(), 10000);
                              },
                              error => {
                                          this.errorRut()
                                          }
                              );
  };

  validarToken(token){
    console.log(token);
    const rut = this.memoria.empresa.Rut;
    if (token == this.memoria.empresa.Token){
        console.log("match!");
        this.memoria.guardarDato("miRut",rut);
        this.memoria.guardarDato("miToken",token);
        this.router.navigate(['/home']);
      }else{
        this.errorToken();
      }
}


traerLocales(tabla){
      this.conector.traedatosGet(`ventasdiarias/empresa/tabla/${tabla}/locales`)
      .subscribe(locales => {console.log(locales.Data);
                           this.memoria.locales = locales.Data;
                         });
}





async errorRut() {
   const alert = await this.alertController.create({
     header: 'Error en el rut',
     subHeader: 'Intentalo de nuevo',
     message: 'El rut no existe o fue mal digitado. Recuerda poner los puntos (.) y el guión (-) ',
     buttons: ['OK']
   });

   await alert.present();
 }

 async errorToken() {
    const alert = await this.alertController.create({
      header: 'Error en el Token',
      subHeader: 'Intentalo de nuevo',
      message: 'El token no coincide, intentalo de nuevo o ponte en contacto con Gour-net para que podamos ayudarte',
      buttons: ['OK']
    });

    await alert.present();
  }


refrescar(){
    location.reload();
}









}
