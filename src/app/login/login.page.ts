import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { 
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  ingresar: any;
  form: any

  constructor(
    public fb: FormBuilder,
    private dataService: DataService,
    private navCtrl: NavController,
    public toastCtrl: ToastController
    
    ) {

    this.formularioLogin = this.fb.group({
      'name': new FormControl("",Validators.required),
      "password": new FormControl("",Validators.required)
    });
   }

  ngOnInit() {
  }

  login(){
    this.form =  this.formularioLogin.value
    console.log(this.form.name);
    this.dataService.loginUsuario(this.form.name).subscribe((res: any)=>{
      console.log(res);
      if (res.data === null) {
        this.present_toast('el usuario no existe');
      } else {
        if (this.form.password === res.data.password ) {
          this.navCtrl.navigateRoot(['./facturacion']);
        } else {
          this.present_toast('contraseña incorrecta');
        }
      }
      
    },
    (err)=>{
      console.log(err);
      
    })
   /*  if (this.nameUser?.value === '' && this.password?.value === '' ) {
      this.present_toast('Rellenar campos');
    } else {
      console.log(this.nameUser?.value);
      
      
    } */
  }

  async present_toast(a: any){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

}
