/**
 * player
 */
AFRAME.registerComponent('player', {
    schema: {
        soul : {type: 'string'},
        avatar : {type: 'boolean'}
    },

    init: function () {
        this.name = 'player';
        this._createAvatar();

    },

    update: function (oldData) {

    },

    remove: function () {

    },

    _click : function () {
        //this.el.setAttribute('transform-controller', { enabled: true, type: this.name});
    },

    _createAvatar : function (){

        console.log( 'createAvatar : ' + this.data.soul);
        let avatarEl = document.createElement('a-entity');
        avatarEl.setAttribute('avatar', {state: 'ready'});
        avatarEl.setAttribute('id', this.data.soul);
        this.el.appendChild(avatarEl);
        sceneG.get('avatars').map().get( this.data.soul ).once( syncPosition );
    }

});