// it is loaded !before! loading a-scene
/**
 * how to set mode
 *
 * 1] change mode to ar
 * 2] paste arjs script
 */
let mode = 'ar';
// <script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"></script>


// your local address
const gun = Gun('http://192.168.1.15:3000/gun', 'http://192.168.86.32:3000/gun');

// function setMode( ) {
//     if(mode === 'ar'){
//         let arjsEl = document.createElement('script');
//         arjsEl.setAttribute('id', 'arjs');
//         arjsEl.setAttribute('src', "https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js");
//         document.head.appendChild(arjsEl);
//         console.log('SET AR MODE');
//     }
// }
// setMode();


/**
 * HOW TO REFRESH ROOT (fake)
 *
 * 1] change 'version' to other string on the sourcecode.
 * 2] (optional) restart server.
 * 3] let everyone refresh page.
 */
let version = '0117-2027' ;

let sceneG = gun.get('root').get( 'scene'+ version );

let name = setName();
let player = {name: name};
sceneG.get('players').set( player);
let playerG = sceneG.get('players').map( data=> data.name === name? data: undefined);

let soul;
function getSoul() {
    playerG.once(( data, key )=>{
        // console.log( data, key);
        soul = key;
    });
}
getSoul();

/**
 * get name
 */
function setName(){
    let first = ['똥닦는', '간절한', '품위있는', '위험한', '치명적인',
        '야비한', '용기있는', '멍청한', '달콤한', '의리의',
        '촉촉한', '게으른', '낮잠자는', '모태솔로', '말랑말랑한'];
    let last = ['허승연', '볼드모트', '박보검', '설현', '헤르미온느',
        '릭', '모티', '보노보노', '다람쥐', '바야바',
        '해리포터', '알파고', '주커버그', '에밀리', '스티브잡스',
        '유병현', '코토리짱', '피카츄', '꼬북이', '파이리',
        '대머리', '마그네슘', '허세임' ];

    let name = first[ Math.floor(Math.random() * first.length) ]
        + " " + last[ Math.floor(Math.random() * last.length) ];

    return name;
}


// function getPlayer(){
//     sceneG.get('players').map( data=> data.name === name? data: undefined).once(( data, key )=>{
//         soul = key;
//         playerG = data;
//     });
// }