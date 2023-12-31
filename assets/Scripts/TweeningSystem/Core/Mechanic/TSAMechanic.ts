import {IQuickFactoryManager} from "../../../Interfaces/IQuickFactoryManager";
import {FactoryManager} from "../../../pTS/Factory/FactoryManager";
import {fm_quick_reg} from "../../../pTS/Support/Decorators";
import {Instance} from "../../../pTS/Support/Functions";
import {TSRObject} from "../../Root/TSRObject";

const {ccclass, property} = cc._decorator;

@fm_quick_reg()
@ccclass('TSAMechanic')
export abstract class TSAMechanic extends TSRObject
{
    @property(
        {
            tooltip: ""
        }
    )
    active: boolean = true;

    @property(
        {
            type: [cc.Node],
            tooltip: `- All other bounding target here.
                    \n- Make sure any of these target are not the 'Main' target of this TweeningComponent's Infomation
                    \n- These target will be called after this action is reached its condition.
                    \n- These target's tween will be run out side the main tween of this TweeningComponent's owner.
                    \n[WARNING] UNSAFE OPTION.`
        }
    )
    bounding_targets: cc.Node[] = []

    @property()
    get time_cost() { return this.duration }

    abstract get duration(): number;

    public gter(action: cc.Tween<any>): cc.Tween<any>
    {
        if(!this.active) return action;
        for (const ret of this.bounding_targets) 
        {
            action.call(() => {this.generator(cc.tween(ret)).start()})
        }
        return this.generator(action)
    }

    protected abstract generator(action: cc.Tween<any>): cc.Tween<any>;

    /**
     * @description
     * | Only run at Editor mode.
     * | Some Mechanic need this to alway resign the data to the pool.
     */
    e_updater(dt: number = 0): void {  }
    public destroy() {}
}

export const _TSQMecha_: IQuickFactoryManager = 
{
    string: "TSAMechanic",
    creator: Instance(FactoryManager).get<ClassType<TSAMechanic>>("TSAMechanic"),
    generator: function (id: string) 
    {
        const ret = Instance(FactoryManager).get<ClassType<TSAMechanic>>("TSAMechanic").generate(id)
        //@ts-ignore
        return new ret();
    }
}

