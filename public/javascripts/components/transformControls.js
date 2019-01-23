/**
 * transform-controls
 */
AFRAME.registerComponent('transform-controls', {
    schema: {
        enabled: {type: 'boolean', default: false},
        type: {type: 'string'},
    },

    init: function () {
        this.name = 'transform-controls';
        this.object = this.el.object3D;
        this.scene = this.el.sceneEl.object3D;



        this.controller = new THREE.TransformControls( this.el.sceneEl.camera, this.el.sceneEl.renderer.domElement );


        this._click = AFRAME.utils.bind(this._click, this);
        this.el.addEventListener('click', this._click);

        this._change = AFRAME.utils.bind(this._change, this);
        this.controller.addEventListener('change', this._change);
    },

    update: function (oldData) {
        if( oldData.enabled !== this.data.enabled){
            if( this.data.enabled === true ){
                let others = this.el.sceneEl.querySelectorAll('['+this.name+']');
                for( let other of others ){
                    if(other !== this.el){
                        other.setAttribute(this.name, {enabled : false});
                    }
                }
                this.controller.attach(this.object);
                this.scene.add( this.controller );
            }else{
                this.controller.detach();
                this.scene.remove(this.controller);
            }
        }
    },

    remove: function () {
        this.controller.removeEventListener('change', this._change);
    },

    _click : function(){

        this.el.setAttribute(this.name, {enabled : true});
        console.log('click')

    },

    _change : function(){
        // console.log( this.data.type );
        // console.log( soul );
        // let id = this.el.getAttribute('id');
        // sceneG.get(this.data.type+'s').get( id ).get('position').put( this.object.position );

    },
    _attach : function(){

    }
});