import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SettingDetailsComponent } from 'src/app/components/setting-details/setting-details.component';
import { SettingSkillComponent } from 'src/app/components/setting-skill/setting-skill.component';
import { SettingUserComponent } from 'src/app/components/setting-user/setting-user.component';
import { TopbarComponent } from 'src/app/components/topbar/topbar.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: true,
  imports: [IonicModule, SettingDetailsComponent, SettingUserComponent, SettingSkillComponent, TopbarComponent]
})
export class SettingPage  {

}
