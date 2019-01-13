// for sharing data

/**
 * reset root
 */
//
// gun.get('root').get('version').on(( data )=>{
//     if( first ){
//         first = false;
//     }else{
//         setRoot( data );
//         console.log( 'reset root');
//         resetGrid();
//     }
//
// });

/**
 * draw grid
 */
sceneG.get('grid').get('length').on(function( data, key ){

    resetGrid();
    console.log(data)
    console.log('draw grid')
    if( data > 0){
        sceneG.get('grid').once((data)=>{
            console.log(data.width, data.height);
            createGrid(data.width, data.height);
        });
    }

});

sceneG.get('grid').get('planes').map().on(function( data, key ){

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