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

        this._click = AFRAME.utils.bind(this._click, this);
        this.el.addEventListener('click', this._click);
        this._loaded = AFRAME.utils.bind(this._loaded, this);
        this.el.addEventListener('model-loaded', this._loaded);


        // 포지션값이 있는지 ? 아니면 뭐 야
    },

    update: function (oldData) {

    },

    remove: function () {
        this._click = AFRAME.utils.bind(this._click, this);
        this.el.removeEventListener('click', this._click);

        this._loaded = AFRAME.utils.bind(this._loaded, this);
        this.el.removeEventListener('model-loaded', this._loaded);
    },

    _click : function () {
        this.el.setAttribute('transform-controller', { enabled: true, type: this.name});
    },

    _loaded : function(){

        sceneG.get('avatars').get(this.el.getAttribute('id')).once( syncPosition );

    }
});