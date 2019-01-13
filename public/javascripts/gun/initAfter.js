// it is loaded !after! loading a-scene
let first = true;

let camera = getCamera();
let sceneEl = document.querySelector('a-scene');
let gridEl = document.querySelector('#grid');



/**
 * reset root string of gundb
 */

function setVersion( v ) {
    gun.get('root').get('version').put( v );
    //return string + version;
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

function createGrid( w, h ){
    console.log('create grid')

    gridG.get('width').put( w );
    gridG.get('height').put( h );
    gridG.get('length').put( w * h );

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
            let planeG = gridG.get('planes').get( 'w'+i+'h'+j );
            planeG.get('width').put(width);
            planeG.get('height').put(height);
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
