/**
 * avatar
 */
AFRAME.registerComponent('avatar', {
    schema: {
        boom: {type: 'boolean', default: false},
        state : {type: 'string'}
    },

    init: function () {
        this.name = 'avatar';
        this.object = this.el.object3D;
        this.scene = this.el.sceneEl.object3D;

        this.el.setAttribute('mixin', 'avatar');

        this._loaded = AFRAME.utils.bind(this._loaded, this);
        this.el.addEventListener('model-loaded', this._loaded);

        if(this.el.getAttribute('id') === soul){
            this.el.setAttribute('transform-controller', { enabled: true, type: this.name});
        }
    },

    update: function (oldData) {

    },

    remove: function () {
        this._loaded = AFRAME.utils.bind(this._loaded, this);
        this.el.removeEventListener('model-loaded', this._loaded);
    },

    _loaded : function(){
        sceneG.get('avatars').get(this.el.getAttribute('id')).once( syncPosition );
    }
});