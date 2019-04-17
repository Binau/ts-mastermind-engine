import {MasterMind} from './index';
import {createInterface} from 'readline';

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});


let readLine = async (): Promise<string> => {

    return new Promise((res, rej) => {
        rl.question('Proposition : ', (answer) => {
            res(answer);
        });
    });


};

let gameLoop = async () => {

    let game = new MasterMind();
    let win = false;

    while (!win) {

        let play = await readLine();
        try {
            let masterMindPlayResult = game.tryResolveWithPlay(play);
            win = masterMindPlayResult.win;
            if(win) console.log(`Victoire en ${masterMindPlayResult.nbPlay} coups !`);
            else console.log(`Bien placé(s)-Mal placé(s) : [${masterMindPlayResult.goodPlace}-${masterMindPlayResult.wrongPlace}]`);
        } catch(e) {
            console.log(e);
        }

    }

};

gameLoop();



