import { Component, OnInit, ViewChild, Renderer, ElementRef } from '@angular/core';
import { ConectorService} from 'src/app/services/conector.service';
import { AlertController } from '@ionic/angular';
import { MemoriaService} from 'src/app/services/memoria.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';



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
  public rutOk: any;
  public mail: string;
  public password :string;
  public empresas: any;
  public empresa: any;
  public datoEmpresa: any;

  constructor(private conector: ConectorService,
              public alertController: AlertController,
              public renderer: Renderer,
              public memoria: MemoriaService,
              private router: Router,
              public toastController: ToastController
              ) {

  }

  ngOnInit() {

    this.rut = this.memoria.leerDato("miRut")
    .then(dato => this.rut = dato);

    this.memoria.leerDato("miToken")
    .then(dato => this.token = dato);

  };


  esconderBoton(){
     this.renderer.setElementStyle(this.cajaRut.nativeElement, 'display', 'none');
     this.renderer.setElementStyle(this.datosUsuario.nativeElement, 'left', '0');
   };

   izquierda(){
     this.renderer.setElementStyle(this.cajaRut.nativeElement, 'left', '-1000px');
   }


   validarRut(rut){
    this.rutPromesa(rut).then(dato => {this.rutOk = dato;
                                        this.conector.traedatosGet(`ventasdiarias/empresa/${this.rutOk}`)
                                        .subscribe(datos => {       this.datoEmpresa = datos['Data']
                                                                    console.log(this.datoEmpresa);
                                                                    this.toastRutCorrecto();
                                                                    this.memoria.empresa = this.datoEmpresa;
                                                                    this.traerLocales(this.memoria.empresa['Tabla']);
                                                                    this.izquierda();
                                                                    this.esconderBoton();

                                                                  },
                                                                  error => {
                                                                            
                                                                            this.errorRut(error.error)
                                                                           }
                                                                  );
                                      }
                              );
  };

  validarToken(token){
    console.log(token);
    const rut = this.memoria.empresa.Rut;
    if (token == this.memoria.empresa.Token){
        console.log("match!");
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


refrescar(){
    location.reload();
}


formato_rut(rut) {
  var sRut1 = rut;      //contador de para saber cuando insertar el . o la -
  console.log(sRut1.length);
  var nPos = 0; //Guarda el rut invertido con los puntos y el guión agregado
  var sInvertido = ""; //Guarda el resultado final del rut como debe ser
  var sRut = "";
  //
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
  //
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
  //
  return(rut);
}


rutPromesa(rut:string):Promise<any>{
  return new Promise((resolve, reject) => {
    this.memoria.guardarDato("miRut",rut);
    const rutOk = this.formato_rut(rut);
    if (rutOk != undefined){
      resolve(rutOk);
    }else{
      reject("404");
    }
  });
}





//ALERTAS & TOASTS


//TOAST
async toastRutCorrecto() {
    const toast = await this.toastController.create({
      message: 'El rut es correcto',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }


  async errorRut(error) {
     const alert = await this.alertController.create({
       header: 'Error en el rut',
       subHeader: 'Intentalo de nuevo',
       message: 'El rut no existe o fue mal digitado. Recuerda no poner puntos (.) ni el guión (-) (error: ' + error.Message + ')',
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

    async sinToken() {
       const alert = await this.alertController.create({
         header: 'Token',
         subHeader: 'Intentalo de nuevo',
         message: 'Para proteger tus datos en Gour-net generamos un Token exclusivo para tu empresa. Te invitamos a ponerte en contacto con la oficina y te daremos el tuyo',
         buttons: ['OK']
       });

       await alert.present();
     }



}
