import { Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { AlertController, NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  form: any


  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private dataService: DataService,
    private navCtrl: NavController,
    ) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      "password": new FormControl("",Validators.required),
      "confirmacionpassword": new FormControl("",Validators.required)
    })
   }

  ngOnInit() {
  }

  async guardar(){
    this.form = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      return;
    }

    var usuario = {
      name: this.form.nombre,
      password: this.form.password
    }
    this.dataService.crearUsuario(usuario).subscribe(async (res: any)=>{
      console.log(res);
      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: 'cuenta registrada',
        buttons: ['Aceptar']
      });
  
      await alert.present();
      this.navCtrl.navigateRoot(['/login'])
    })

  }

  async validarContrasena(){
    console.log('si llega por aca');
    
    if (this.form.password === this.form.confirmacionpassword) {
      console.log('contraseñas correta');
     } else {
      const alert = await this.alertController.create({
        header: 'Coneñas no coinciden',
        message: 'Escriba de manera correcta la contraseña',
        buttons: ['Aceptar']
      });
  
      await alert.present();
     }
  }
}
