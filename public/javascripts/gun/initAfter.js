// it is loaded !after! loading a-scene
let first = true;

let camera = getCamera();
let sceneEl = document.querySelector('a-scene');
let gridEl = document.querySelector('#grid');


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
    let gridEl = document.createElement('a-entity');
    gridEl.setAttribute('id', 'grid');

    if( mode === 'ar'){
        let markerEl = document.createElement('a-marker');
        sceneEl.appendChild( markerEl );
        gridEl.setAttribute('rotation', {x:-90});
        markerEl.appendChild(gridEl);
    }else{
        console.log('set sky')
        let skyEl = document.createElement('a-sky');
        skyEl.setAttribute('color', '#6EBAA7');
        sceneEl.appendChild( skyEl );
        sceneEl.appendChild(gridEl);
    }

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
            planeEl.setAttribute('seat', {owner: 'none'});

            let playerEl = document.createElement('a-entity');
            playerEl.setAttribute('player' );
            playerEl.setAttribute('position', { x: width, y: 0, z: height });
            gridEl.appendChild(playerEl);
            playerEl.appendChild(planeEl);

            if( !first ){
                // reset ownership
                let seatG = sceneG.get('grid').get('seats').get( id );
                seatG.get('owner').put('none');
                seatG.get('soul').put('none');
                playerG.get('seat').put( seatG );
            }
        }
    }
    first = false;
}
function resetGrid(){
    gridEl = document.querySelector('#grid');

    let parentEl = document.querySelector('a-scene');

    if( gridEl ){
        parentEl.removeChild( gridEl );
    }
    gridEl = document.createElement('a-entity');
    if(mode === 'ar'){


    }

    gridEl.setAttribute('id', 'grid');
    parentEl.appendChild( gridEl );
}


function bomb( state ){
    sceneG.get('bomb').put( state );
}

/**
 * callback functions for gun
 */

bomb( 'none' );
let syncPosition = function ( data, key ){
    let el = document.querySelector('#'+key);
    // console.log( key )
    if(el){
        let object = el.object3D;
        if( object !== undefined ) {
            // console.log(object);
            this.get('position').once(function (data) {
                // console.log(data);
                if(data !== undefined){
                    object.position.copy(data);
                }
            });
        }
    }
}

sceneG.get('grid').get('seats').map().once(function( data, key ){
    let id = key;
    // console.log( data.owner );
    let el = document.querySelector('#'+ id );
    if(el){
        el.setAttribute('seat', { owner: data.owner});
        el.parentElement.setAttribute('player', {soul: data.soul})
    }
});
