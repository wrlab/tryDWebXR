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


    // console.log( data.owner );
    let el = document.querySelector('#'+ id );
    if(el){
        el.setAttribute('seat', { owner: data.owner});
        el.parentElement.setAttribute('player', {soul: data.soul})
    }
});


/**
 * synchronize position of balloons without saving at html
 */

// sceneG.get('balloons').map().on( syncPosition );
sceneG.get('avatars').map().on( syncPosition );




