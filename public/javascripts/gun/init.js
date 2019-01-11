const gun = Gun('http://192.168.1.77:3000/gun');
let test = 'scene0110'
let sceneG = gun.get('root').get(test);
let namesG = gun.get('root').get('names');

// namesG.set('a');
// namesG.set('b');
// namesG.set('c');

namesG.open(( data )=>{
    console.log(data);
});
