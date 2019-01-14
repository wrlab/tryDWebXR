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
    if( data > 0){
        sceneG.get('grid').once((data)=>{
            createGrid(data.width, data.height);
        });
    }

});

sceneG.get('grid').get('seats').map().on(function( data, key ){
    let id = key;
    let owner = data.owner;
    let el = document.querySelector('#'+ id );
    if(el){
        el.setAttribute('seat', {owner: owner});
    }
});


/**
 * synchronize position of balloons without saving at html
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

