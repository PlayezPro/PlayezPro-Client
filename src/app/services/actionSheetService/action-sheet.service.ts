import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {
  constructor(private actionSheetController: ActionSheetController) {}

  async presentActionSheet(postUrl: string) {
    const encodedUrl = encodeURIComponent(postUrl);
    const actionSheet = await this.actionSheetController.create({
      header: '¡Enséñaselo a todos!',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Comparte con Twitter',
          icon: 'logo-twitter',
          handler: () => {
            window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}`, '_blank');
          }
        },
        {
          text: 'Comparte con LinkedIn',
          icon: 'logo-linkedin',
          handler: () => {
            window.open(`https://www.linkedin.com/shareArticle?url=${encodedUrl}`, '_blank');
          }
        },
        {
          text: 'Comparte con WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            window.open(`https://api.whatsapp.com/send?text=${encodedUrl}`, '_blank');
          }
        },
        {
          text: 'Copiar URL',
          icon: 'copy-outline',
          handler: () => {
            navigator.clipboard.writeText(postUrl).then(() => {
              alert('URL copiada a portapapeles');
            });
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
        }
      ],
    });
    await actionSheet.present();
  }
}
