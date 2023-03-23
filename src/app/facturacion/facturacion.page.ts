import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NuevaFacturaComponent } from './components/nueva-factura/nueva-factura.component';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
})
export class FacturacionPage implements OnInit {
  productos: any[] = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async nuevoFactura() {
    const modal = await this.modalCtrl.create({
      component: NuevaFacturaComponent,
      cssClass:'modalFactura'
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    
    this.productos.push(data);
  }

}
