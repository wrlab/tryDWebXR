// it is loaded !after! loading a-scene
let first = true;

let camera = getCamera();
let sceneEl = document.querySelector('a-scene');
let gridEl = document.querySelector('#grid');



/**
 * reset root string of gundb
 */

function setVersion( v ) {
    gun.get('root').get('version').put( v ).later(()=>{
        gun.get('root').get( 'scene'+ v ).get('grid').get('length').put(-1);
    }, 1);
}

function setRoot( data ){
    console.log(name);
    version = data;

    sceneG = gun.get('root').get( 'scene'+ version );
    namesG = gun.get('root').get( 'names'+ version );
    namesG.get( name ).get('name').put( name );

    gridG = sceneG.get('grid');
    // gridG.get('length').put( -1 );

}




function getCamera(){
    let cameras = document.querySelectorAll('[camera]');
    let camera;
    if ( cameras !== undefined ){
        console.log( cameras.length + ' cameras are running.' )
        camera = cameras[0];
    }else{
        camera = undefined; // 만들어줘야겠지만 그럴일은 없어
    }
    return camera;
}

function setGrid(w, h){

    gridG.get('width').put( w );
    gridG.get('height').put( h );
    gridG.get('length').put( w * h );

}

function createGrid( w, h ){
    console.log('create grid')
    let maxW, maxH; // initial position
    let intervalW = 1;
    let intervalH = 1;

    if ( ( w%2 ) === 0){
        maxW = w/2 - 0.5;
    } else {
        maxW = w/2 - 1;
    }
    if ( ( h%2 ) === 0){
        maxH = h/2 - 0.5;
    } else {
        maxH = h/2 - 1;
    }

    for( let i = 0; i < w; i++ ){
        for( let j = 0; j < h; j++ ){
            let width = maxW - i*intervalW;
            let height = maxH - j*intervalH;
            let id = 'w'+i+'h'+j;

            planeEl = document.createElement('a-entity');
            planeEl.setAttribute('id', id);
            planeEl.setAttribute('mixin', 'grid-plane');
            planeEl.setAttribute('position', { x: width, y: 0, z: height });
            gridEl.appendChild(planeEl);
            gridG.get('planes').get( id );

        }
    }
}

function resetGrid(){

    if( gridEl ){
        sceneEl.removeChild( gridEl );
    }
    gridEl = document.createElement('a-entity');
    gridEl.setAttribute('id', 'grid');
    sceneEl.appendChild( gridEl );
    console.log('Reset grid.');
}
