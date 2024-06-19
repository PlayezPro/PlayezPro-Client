import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonPlayezComponent } from 'src/app/components/ui_ux/button-playez/button-playez.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SkillService } from 'src/app/services/skillService/skill.service';
// import { ChartDataset, ChartOptions } from 'chart.js';
import { Chart} from 'chart.js/auto';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-skills-graphics',
  templateUrl: './skills-graphics.component.html',
  styleUrls: ['./skills-graphics.component.scss'],
  standalone: true,
  imports : [CommonModule, IonicModule, ButtonPlayezComponent,]
})

export class SkillsGraphicsComponent implements OnInit, OnChanges {
  @Input() users_id: string | null = null;
  dataSets: any[] = [];
  radarChart: any;
  private comparisonDone: boolean = false;
  isManageUserPage: boolean = false;

  constructor(private skillService: SkillService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isManageUserPage = this.router.url.includes('manage-user');
    });
    this.destroyChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users_id'] && changes['users_id'].currentValue) {
      this.generateGraphic(changes['users_id'].currentValue);
    }
  }
  private destroyChart() {
    if (this.radarChart) {
      this.radarChart.destroy();
      this.radarChart = null;
    }
  }

  async generateGraphic(users_id: string) {
    try {
      const graphicsData = await this.skillService.getUserSkill(users_id);
      if (Array.isArray(graphicsData) && graphicsData.length > 0) {
        const userSkills = graphicsData[0];
        const labels = ['Ritmo', 'Disparo', 'Pase', 'Regate', 'Defensa', 'Fisico'];

        this.dataSets = [{
          data: [
            userSkills.pace ?? 0,
            userSkills.shot ?? 0,
            userSkills.pas ?? 0,
            userSkills.dribble ?? 0,
            userSkills.defense ?? 0,
            userSkills.physical ?? 0
          ],
          label: 'Local'
        }];

        if (this.radarChart) {
          this.radarChart.destroy();
        }

        const ctx = document.getElementById('radarCanvas') as HTMLCanvasElement;
        this.radarChart = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: labels,
            datasets: this.dataSets
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          }
        });
      } else {
        console.error('graphicsData no es un array o está vacío');
      }
    } catch (error) {
      console.error('Error al generar el gráfico:', error);
    }
  }

  async compararSkills() {
    if (this.comparisonDone) {
      return;
    }

    try {
      const localUserId = localStorage.getItem('users_id');
      if (!localUserId) {
        console.error('No se encontró el ID de usuario en localStorage');
        return;
      }

      const localUserData = await this.skillService.getUserSkill(localUserId);
      if (Array.isArray(localUserData) && localUserData.length > 0) {
        const localUserSkills = localUserData[0];

        this.dataSets.push({
          data: [
            localUserSkills.pace ?? 0,
            localUserSkills.shot ?? 0,
            localUserSkills.pas ?? 0,
            localUserSkills.dribble ?? 0,
            localUserSkills.defense ?? 0,
            localUserSkills.physical ?? 0
          ],
          label: 'Visitante',
          backgroundColor: 'rgba(231, 255, 13,0.35)', // Verde claro
          borderColor: 'rgba(231,255,13, 1)', // Verde
          borderWidth: 1
        });

        this.radarChart.data.datasets = this.dataSets;
        this.radarChart.update();

        this.comparisonDone = true;  // Marcar la comparación como hecha
      } else {
        console.error('localUserData no es un array o está vacío');
      }
    } catch (error) {
      console.error('Error al comparar skills:', error);
    }
  }
}