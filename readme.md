
#Moteur de jeu mastermind

```ts

// Initialisation d'une grille de 4 positions avec un 4 valeurs possibles (0123)
let game = new MasterMind();

// Initialisation d'une grille de 8 positions avec un 14 valeurs possibles (0123456789abcd)
let game2 = new MasterMind({
    range:14,
    count:8
});

// Tentatvice de coup 
let masterMindPlayResult = game.tryResolveWithPlay('0123');

// Si le coup est invalide (par rapport au nombre de caracteres proposés), une exception est retournée
try {
    let masterMindPlayResult = game.tryResolveWithPlay('0123456789');
} catch(e) {
    console.log(e); // coup invalide
}
// Infos en retour
// - On a gagné ?  masterMindPlayResult.win
// - Nombre de bien placé  : masterMindPlayResult.goodPlace
// - Nombre de mal placé   : masterMindPlayResult.wrongPlace
// - Nombre de coups joués : masterMindPlayResult.nbPlay

```

# Installation avec npm
```
npm install --save ts-mastermind-engine
```

# Licence
CC BY 4.0 : https://creativecommons.org/licenses/by/4.0/
