import EXTMovingAction from "../../Extender/EXTMovingAction";
import {FCChainAction} from "../Root/FCChainAction";

const {ccclass, property, menu} = cc._decorator;

@ccclass
@menu('FastComponent/Chain/Moving')
export default class FCChainMoving extends FCChainAction
{
    @property(
        {
            type: [EXTMovingAction],
            override: true
        }
    )
    actions: EXTMovingAction[] = []

    protected get time_cost(): number 
    {
        let total: number = 0
        for(const ret of this.actions)
        {
            total += ret.duration;
        }
        return total;
    }

    protected _generate_actions(): void 
    {
        for(const ret of this.actions)
        {
            ret.generate(this._action_);
        }
    }
}
