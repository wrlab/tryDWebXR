// for sharing data

/**
 * draw grid
 */
sceneG.get('grid').get('length').on(function( data, key ){

    // resetGrid();
    if( data > 0){
        sceneG.get('grid').once((data)=>{
            createGrid(data.width, data.height);
        });
    }

});

sceneG.get('grid').get('seats').map().on(function( data, key ){
    let id = key;

    let el = document.querySelector('#'+ id );
    if(el){
        el.setAttribute('seat', { owner: data.owner});
        el.parentElement.setAttribute('player', {soul: data.soul})
    }
});

// sceneG.get('bomb').on( function( data, key ){
//     let bombEl = document.querySelector('#bomb');
//     bombEl.setAttribute('bomb', { state: data });
// });

/**
 * synchronize position
 */

sceneG.get('avatars').map().on( syncPosition );




