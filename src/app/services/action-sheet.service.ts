import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {
  constructor(private actionSheetController: ActionSheetController) {}

  async presentActionSheet(postUrl: string) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Share on Twitter',
          icon: 'logo-twitter',
          handler: () => {
            this.shareOnTwitter(postUrl);
          }
        },
        {
          text: 'Share on LinkedIn',
          icon: 'logo-linkedin',
          handler: () => {
            this.shareOnLinkedIn(postUrl);
          }
        },
        {
          text: 'Share on WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.shareOnWhatsApp(postUrl);
          }
        },
        {
          text: 'Copy URL',
          icon: 'link-outline',
          handler: () => {
            this.copyToClipboard(postUrl);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {}
        }
      ],
    });
    await actionSheet.present();
  }

  private shareOnTwitter(url: string) {
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  }

  private shareOnLinkedIn(url: string) {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  }

  private shareOnWhatsApp(url: string) {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    window.open(whatsappUrl, '_blank');
  }

  private copyToClipboard(url: string) {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    });
  }
}
