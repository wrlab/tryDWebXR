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
        // todo 좌석에 아바타를 만들어서 세워두기 .

        console.log( 'createAvatar : ' + this.data.soul);

        let avatarEl = document.createElement('a-entity');
        avatarEl.setAttribute('avatar', {state: 'ready'});
        // console.log(this.data.soul)
        avatarEl.setAttribute('id', this.data.soul);





        this.el.appendChild(avatarEl);
        sceneG.get('avatars').map().get(this.data.soul).once(syncPosition);
        //
        // // this.el.parentElement.setAttribute('player', {soul: soul});
        // this.el.parentElement.appendChild( avatarEl );
        // // document.querySelector('#grid').appendChild(avatarEl);


    }

});