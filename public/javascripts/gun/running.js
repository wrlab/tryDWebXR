// for sharing data

/**
 * reset root
 */

gun.get('root').get('version').on(( data )=>{
    setRoot( data );
    console.log( 'reset root');
});

/**
 * draw grid
 */
gridG.get('length').on(function( data, key ){

    resetGrid();
    gridG.once((data)=>{
        createGrid(data.width, data.height);
    });
});

gridG.get('planes').map().on(function( data, key ){

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