// for sharing data

/**
 * draw grid
 */
gridG.get('length').on(function( data, key ){
    resetGrid();
});

gridG.get('planes').map().on(function( data, key ){

    let length;
    gridG.get('length').once((data)=>{
        length = data;
    });
    if( (length !== -1) && (length !== undefined)){
        let planeEl = document.querySelector('#'+key);
        if( !planeEl ){
            planeEl = document.createElement('a-entity');
            planeEl.setAttribute('id', key);
            planeEl.setAttribute('mixin', 'grid-plane');
            gridEl.appendChild(planeEl);
        }
        planeEl.setAttribute('position', { x: data.width, y: 0, z: data.height });
    }
});

/**
 * synchronize position of balloons
 */

sceneG.get('balloons').map().on(function(data, key){
    let el = document.querySelector('#'+key);
    let object = el.object3D;
    if( object !== undefined ) {
        // console.log(object);
        this.get('position').once(function (data) {
            // console.log(data);
            object.position.copy(data);
        });
    }
});