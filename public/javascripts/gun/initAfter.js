// it is loaded !after! loading a-scene
let first = true;

let camera = getCamera();
let sceneEl = document.querySelector('a-scene');
let gridEl = document.querySelector('#grid');



/**
 * reset root string of gundb
 */

// function setVersion( v ) {
//     gun.get('root').get('version').put( v );
// }
//
// function setRoot( data ){
//     console.log(name);
//     version = data;
//
//     sceneG = gun.get('root').get( 'scene'+ version );
//     namesG = gun.get('root').get( 'names'+ version );
//     namesG.get( name ).get('name').put( name );
// }

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
    let gridG = sceneG.get('grid');
    gridG.get('width').put( w );
    gridG.get('height').put( h );
    gridG.get('length').put( w * h );
}

function createGrid( w, h ){
    console.log('create grid');
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

            let planeEl = document.createElement('a-entity');
            planeEl.setAttribute('id', id);
            planeEl.setAttribute('mixin', 'grid-plane');
            planeEl.setAttribute('position', { x: width, y: 0, z: height });
            planeEl.setAttribute('seat', {owner: 'none'});
            gridEl.appendChild(planeEl);

            if( !first ){
                sceneG.get('grid').get('seats').get( id ).get('owner').put('none');
            }

        }
    }
    first = false;
}

function resetGrid(){
    gridEl = document.querySelector('#grid');
    if( gridEl ){
        sceneEl.removeChild( gridEl );
    }
    gridEl = document.createElement('a-entity');
    gridEl.setAttribute('id', 'grid');
    sceneEl.appendChild( gridEl );
}

/**
 * initialize position of balloons
 */

sceneG.get('balloons').map().once(function(data, key){
    let el = document.querySelector('#'+key);
    let object = el.object3D;
    if( object !== undefined ) {
        this.get('position').once(function (data) {
            el.setAttribute('position', data);
        });
    }
});

sceneG.get('grid').get('seats').map().once(function( data, key ){
    let id = key;
    let owner = data.owner;
    let el = document.querySelector('#'+ id );
    if(el){
        el.setAttribute('seat', {owner: owner});
    }
});


