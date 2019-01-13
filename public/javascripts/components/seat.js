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
    },

    update: function (oldData) {
        if( oldData.owner !== this.data.owner){
            if( this.data.owner === name ) { // my seat
                seat = true;
                this.el.setAttribute('material', {color: '#ff7158'});
            }else if (this.data.owner === 'none'){
                this.el.setAttribute('material', {color: '#ffffff' });
            }else{
                this.el.setAttribute('material', {color: '#a8a8a8' });

            }
        }
    },

    remove: function () {
        this.el.removeEventListener("onclick");
    },

    _click : function () {
        let id = this.el.getAttribute('id');
        console.log(this.data.owner)
        console.log(seat)
        if( (this.data.owner === 'none' ) && (seat === false)){
            sceneG.get('grid').get('seats').get( id ).get('owner').put( name );
            namesG.get( name ).get('seat').put(id);
        }


    }
});