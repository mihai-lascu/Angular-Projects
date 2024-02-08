import {
    Component,
    ContentChild, effect,
    input,
    TemplateRef
} from '@angular/core';
import { Dialog } from "@angular/cdk/dialog";

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss'
})
export class ModalComponent {
    @ContentChild(TemplateRef, { static: false }) template!: TemplateRef<any>;
    isOpen = input<boolean>();

    constructor(private dialog: Dialog) {
        effect(() => {
            if (this.isOpen()) {
                this.dialog.open(
                    this.template,
                    { panelClass: 'dialog-container' }
                );
            } else {
                this.dialog.closeAll();
            }
        })
    }
}
