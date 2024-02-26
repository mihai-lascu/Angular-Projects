export enum ActionSelectTypes {
    Button,
    Anchor
}

export class ActionSelectButton {
    public static ENTITY_ID_TOKEN = '%entityId%';
    public static ENTITY_PR_ID_TOKEN = '%entityPrId%';
    type: ActionSelectTypes = ActionSelectTypes.Button;
    id?: string;
    dataTest?: string;
    label!: string;
    icon?: string;
    routerLink?: string;
    disabled?: boolean;
    tooltip?: string;
    data?: any;
    hidden?: (entity?: any) => boolean;
    clickHandler?: (entity?: any) => any = () => {};
}

export class ActionSelectConfig {
    actions: Array<ActionSelectButton> = [];
    counterFct!: (entity: any) => number;

    disableAction(label: string) {
        const result = this.getActionSelectButton(label);
        if (result) { result.disabled = true; }
    }

    enableAction(label: string) {
        const result = this.getActionSelectButton(label);
        if (result) { result.disabled = false; }
    }

    getActionSelectButton(label: string)  {
        return this.actions.find((asb) => asb.label === label);
    }
}