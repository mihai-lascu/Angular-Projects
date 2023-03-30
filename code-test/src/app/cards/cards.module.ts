import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCardComponent } from './action-card/action-card.component';
import { StatusCardComponent } from './status-card/status-card.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [ActionCardComponent, StatusCardComponent, CardComponent],
	imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
	exports: [ActionCardComponent, StatusCardComponent, CardComponent],
})
export class CardsModule {}
