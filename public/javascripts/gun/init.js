const gun = Gun('http://192.168.1.77:3000/gun');
let test = 'scene0110'
let sceneG = gun.get('root').get(test);