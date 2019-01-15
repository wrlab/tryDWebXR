/**
 * bomb
 */
AFRAME.registerComponent('bomb', {
    schema: {
        state : {type: 'string', default: 'none'}
    },

    init: function () {
        this.name = 'bomb';

        // this.el.setAttribute('position', '0 3 0');
    },

    update: function (oldData) {

        if ( this.data.state === 'start') {
            this.el.setAttribute('visible', true);

        } else if ( this.data.state === 'none') {
            this.el.setAttribute('visible', false);
        }

    },

    remove: function () {

    },

    _click : function () {
        //this.el.setAttribute('transform-controller', { enabled: true, type: this.name});
    }

});