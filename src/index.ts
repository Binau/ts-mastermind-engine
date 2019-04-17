export class MasterMindConf {
    range?: number;
    count?: number;
}

export class MasterMindPlayResult {
    win: boolean;
    nbPlay: number;
    goodPlace: number;
    wrongPlace: number;
}

class PlayResultBean {
    play: string;
    goodPlace: number = 0;
    wrongPlace: number = 0;
    remainingPlayChars: string[] = [];
    remainingCodeChars: string[] = [];
}


export class MasterMind {

    private static RANGE_CHOICE: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    private codeCharGenerator: IterableIterator<string> = this.codeCharGeneratorFct();

    private rangeChoice: string;
    private countChoice: number;
    private code: string = '';
    private nbPlay: number = 0;

    constructor(private conf: MasterMindConf = {}) {

        conf.range = conf.range % MasterMind.RANGE_CHOICE.length || 4;
        conf.count = conf.count || 4;
        //
        this.rangeChoice = MasterMind.RANGE_CHOICE.substr(0, conf.range);
        this.countChoice = conf.count;

        console.log(`Choix de ${this.countChoice} valeur(s) parmis [${this.rangeChoice}]...`);
        this.generateCode();
        console.log('Code généré !');

    }

    /**
     *
     * @param value
     */
    public tryResolveWithPlay(value: string): MasterMindPlayResult {

        if (!value || value.length !== this.countChoice) throw 'coup invalide';

        let resultBean: PlayResultBean = new PlayResultBean();
        resultBean.play = value;
        this.findGoodPlace(resultBean);
        this.findWrongPlace(resultBean);

        this.nbPlay++;
        return {
            win: resultBean.goodPlace === this.countChoice,
            goodPlace: resultBean.goodPlace,
            wrongPlace: resultBean.wrongPlace,
            nbPlay: this.nbPlay
        };
    }

    private findWrongPlace(bean: PlayResultBean) {

        for (let codeChar of bean.remainingCodeChars) {

            if (bean.remainingPlayChars.includes(codeChar)) {
                // Existe mal placé
                bean.wrongPlace++;

                // on le supprime pour ne pas le recompter mal placé si il apparait une nouvelle fois dans la solution
                bean.remainingPlayChars.splice(bean.remainingPlayChars.indexOf(codeChar), 1);
            }

        }

    }

    private findGoodPlace(bean: PlayResultBean) {

        let idx = 0;
        for (let codeChar of this.code) {

            let playChar = bean.play[idx];

            if (codeChar === playChar) {
                // Bien placé
                bean.goodPlace++;

            } else {
                // Mal placé
                bean.remainingCodeChars.push(codeChar);
                bean.remainingPlayChars.push(playChar);
            }
            idx++;
        }
    }

    private generateCode(): void {
        for (let i = 0; i < this.countChoice; i++) {
            this.code += this.codeCharGenerator.next().value;
        }
    }

    private* codeCharGeneratorFct(): IterableIterator<string> {
        while (true) {
            let idx = Math.floor(Math.random() * this.rangeChoice.length);
            yield this.rangeChoice[idx];
        }
    }


}