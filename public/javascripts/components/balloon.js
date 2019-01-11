/**
 * balloon
 */
AFRAME.registerComponent('balloon', {
    schema: {
        boom: {type: 'boolean', default: false},
    },

    init: function () {
        this.name = 'balloon';
        this.object = this.el.object3D;
        this.scene = this.el.sceneEl.object3D;

        this._click = AFRAME.utils.bind(this._click, this);
        this.el.addEventListener('click', this._click);
    },

    update: function (oldData) {

    },

    remove: function () {
        this.el.removeEventListener("onclick");
    },

    _click : function () {
        this.el.setAttribute('transform-controller', {enabled : true});
    }
});