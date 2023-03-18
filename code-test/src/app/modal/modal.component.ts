import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CardsService } from '../cards.service';
import { Card, CARD_TYPES } from '../utils/types';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
	public formGroup: FormGroup = this.buildForm();

	constructor(
		private dialogRef: MatDialogRef<ModalComponent>,
		private cardsService: CardsService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {}

	private buildForm(): FormGroup {
		return this.formBuilder.group({
			printer: ['', Validators.required],
			statusReport: [false],
			performance: [false],
			printerActions: [false],
			jobActions: [false],
		});
	}

	onSubmit(): void {
		const cards: Card[] = [];
		const formValue = this.formGroup.value;

		Object.keys(formValue).forEach((key) => {
			if (key === 'statusReport' && formValue[key])
				cards.push({
					printer: formValue.printer,
					type: CARD_TYPES.StatusReport,
				});
			if (key === 'performance' && formValue[key])
				cards.push({
					printer: formValue.printer,
					type: CARD_TYPES.Performance,
				});
			if (key === 'printerActions' && formValue[key])
				cards.push({
					printer: formValue.printer,
					type: CARD_TYPES.PrinterActions,
				});
			if (key === 'jobActions' && formValue[key])
				cards.push({
					printer: formValue.printer,
					type: CARD_TYPES.JobActions,
				});
		});

		this.cardsService.addCards(cards);
		this.dialogRef.close();
	}

	onCancel(): void {
		this.dialogRef.close();
	}
}
