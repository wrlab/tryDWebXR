/**
 * seat
 */

let seat = false;

AFRAME.registerComponent('seat', {
    schema: {
        owner: {type: 'string', default: 'none'},
    },

    init: function () {
        this.name = 'seat';
        this.object = this.el.object3D;
        this.scene = this.el.sceneEl.object3D;

        this._click = AFRAME.utils.bind(this._click, this);

        this.el.addEventListener('click', this._click);
        //this.el.addEventListener('triggerup', this._click);
    },

    update: function (oldData) {
        if( oldData.owner !== this.data.owner){
            if( this.data.owner === name ) { // my seat
                this.el.setAttribute('material', {color: '#ff5a30'})
            }else if (this.data.owner === 'none'){
                this.el.setAttribute('material', {color: '#737373' });
            }else{
                this.el.setAttribute('material', {color: '#BF80FF' });
            }
        }
    },

    remove: function () {
        this._click = AFRAME.utils.bind(this._click, this);
        this.el.removeEventListener('click', this._click);
        this.el.removeEventListener('triggerup', this._click);
    },

    _click : function () {
        console.log('click');

        if( this.data.owner === 'none' ){
            playerG.get( 'seat' ).once((data, key) => {
                // console.log(data);
                if((data === undefined) || (data.owner === 'none')){
                    this._occupy();
                }
            });
        }
        console.log('owner: '+ this.data.owner);
    },

    _occupy : function () {

        // console.log( 'occupy' );
        let id = this.el.getAttribute('id');
        let seatG = sceneG.get('grid').get('seats').get( id );
        seatG.get('soul').put( soul );
        seatG.get('owner').put( name )
        playerG.get('seat').put( seatG );

    },



});