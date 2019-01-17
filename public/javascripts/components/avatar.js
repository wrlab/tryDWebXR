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
        this.id = this.el.getAttribute('id');

        this.el.setAttribute('position', {y:0.5});
        this.el.setAttribute('mixin', 'avatar');
        sceneG.get('players').get(this.id).once((data,key)=>{
            this.nickname = data.name;
        });

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
        this._nickname();
    },

    _nickname : function () {
        sceneG.get('players').get(this.id).once((data,key)=>{
            this.nickname = data.name;
        });

        console.log(this.nickname)
        let nicknameEl = document.createElement('a-text');
        // todo  text 어트리뷰트로 저장하는걸로 바꾸고 코드 한번에 정리하자.

        nicknameEl.setAttribute('shader', 'msdf');
        nicknameEl.setAttribute('font', "https://raw.githubusercontent.com/myso-kr/aframe-fonts-korean/master/fonts/ofl/nanumgothic/NanumGothic-Regular.json");
        nicknameEl.setAttribute('color','#000000');
        nicknameEl.setAttribute('align', 'center');
        nicknameEl.setAttribute('rotation', {y: -90});
        nicknameEl.setAttribute('position', {y:0.5});
        nicknameEl.setAttribute('scale', "0.7 0.7 0.7")
        nicknameEl.setAttribute('value', this.nickname);
        this.el.appendChild( nicknameEl );
    }

});