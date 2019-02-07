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
  public datoEmpresa: any;

  constructor(private conector: ConectorService,
              public alertController: AlertController,
              public renderer: Renderer,
              public memoria: MemoriaService,
              private router: Router
              ) {
              this.rut = "76.022.389-1",
              this.token= "4648A"
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
    const rutModificado = this.formato_rut(rut);


    this.conector.traedatosGet(`ventasdiarias/empresa/${rutModificado}`)
    .subscribe(datos => {       this.datoEmpresa = datos['Data']
                                console.log(this.datoEmpresa);
                                this.memoria.empresa = this.datoEmpresa;
                                this.traerLocales(this.memoria.empresa['Tabla'])
                                this.izquierda();
                                this.esconderBoton();

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
        this.router.navigate(['/ventasdiarias']);
      }else{
        this.errorToken();
      }
}


traerLocales(tabla){
      this.conector.traedatosGet(`ventasdiarias/empresa/tabla/${tabla}/locales`)
      .subscribe(locales => {console.log(locales['Data']);
                           this.memoria.locales = locales['Data'];
                         });
}





async errorRut() {
   const alert = await this.alertController.create({
     header: 'Error en el rut',
     subHeader: 'Intentalo de nuevo',
     message: 'El rut no existe o fue mal digitado. Recuerda no poner puntos (.) ni el guión (-) ',
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


formato_rut(rut)
{

  var sRut1 = rut;      //contador de para saber cuando insertar el . o la -
  console.log(sRut1.length);
  var nPos = 0; //Guarda el rut invertido con los puntos y el guión agregado
  var sInvertido = ""; //Guarda el resultado final del rut como debe ser
  var sRut = "";

  for(var i = sRut1.length - 1; i >= 0; i-- )
  {
      sInvertido += sRut1.charAt(i);
      if (i == sRut1.length - 1 )
          sInvertido += "-";
      else if (nPos == 3)
      {
          sInvertido += ".";
          nPos = 0;
      }
      nPos++;
  }

  for(var j = sInvertido.length - 1; j >= 0; j-- )
  {
      if (sInvertido.charAt(sInvertido.length - 1) != ".")
          sRut += sInvertido.charAt(j);
      else if (j != sInvertido.length - 1 )
          sRut += sInvertido.charAt(j);
  }
  //Pasamos al campo el valor formateado
  rut = sRut.toUpperCase();
  if (rut.length < 12) {
    rut = "0"+ rut;
  }

  return rut;
}






}
