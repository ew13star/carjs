

var blending = ['AdditiveBlending'];
var tween;
var bmw, fbx, fbxParts, materialsLib, envMap, groundTexture, groundMat;
var clock = new THREE.Clock();
var speed = 0.004;
var fbxParts = {
        body: [],
        rims:[],
        glass: [],
      };
var composer2, finalComposer;
var rims = [];
var params = {
        projection: 'normal',
        autoRotate: true,
        reflectivity: 1.0,
        background: false,
        exposure: 1.0,
        gemColor: 'White',
        glassColor: 'White',
        rims: 'rims1'
      }


window.onload = function() {
  ///preloader
   setTimeout(function(){
    var preloader = document.getElementById('page-preloader');
    if(!preloader.classList.contains("done"))
    {
      preloader.classList.add("done")
    }
  }, 1000);
///
var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xdad8d5, 1000, 4000);
envMap = new THREE.CubeTextureLoader()
       .setPath( 'https://www.dropbox.com/sh/tk60pblpzveu31k/AADYpj5L6M10h-0CQuc9Rvqia?dl=0&raw=1')
       .load( [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ] );
scene.background = envMap;

// specularMap = new THREE.TextureLoader().load("model/asphalt_mirror_mask.jpg", function ( map3 ) {
//           map3.wrapS = THREE.RepeatWrapping;
//           map3.wrapT = THREE.RepeatWrapping;
//           map3.anisotropy = 30;
//           map3.repeat.set( 1, 1 );
//           specularTexture = map3;
//   }  );


// normalTexture = new THREE.TextureLoader().load("model/asphalt_mirror_mask.jpg")

var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10000 );
camera.position.set(600, 300, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize( window.innerWidth, window.innerHeight);

renderer.setClearColor( 0xE9E9E9 );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );


var hemiLight = new THREE.HemisphereLight( 0xdad8d5, 0x666666, 1,5 );
        hemiLight.position.set( 1000, 500, 1000 );
        scene.add( hemiLight );

var light = new THREE.DirectionalLight( 0xdfebff, 0.2 );
        light.position.set( 50, -50, 100 );
        light.position.multiplyScalar( 1.3 );
        light.castShadow = false;
        light.shadow.mapSize.width = 1000;
        light.shadow.mapSize.height = 500;
        var d = 300;
        light.shadow.camera.left = - d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = - d;
        light.shadow.camera.far = 1000;
        scene.add( light );


var lightHolder = new THREE.Group();

var shadowLight  = new THREE.DirectionalLight( 0xffffee, 0.1 );
        shadowLight.position.set( -1.5, 1.25, -1.5 );
        shadowLight.castShadow = false;
        shadowLight.shadow.width = 512;
        shadowLight.shadow.height = 512;
        shadowLight.shadow.camera.top = 2;
        shadowLight.shadow.camera.bottom = -2;
        shadowLight.shadow.camera.left = -2.5;
        shadowLight.shadow.camera.right = 2.5;
        shadowLight.shadow.camera.far = 5.75;
        shadowLight.shadow.bias = -0.025;
        lightHolder.add( shadowLight, shadowLight.target );
        scene.add(lightHolder);


var map3 = new THREE.TextureLoader().load( 'https://www.dropbox.com/s/rcu8wqzsk0x3ixg/lensflare2.jpg?dl=0&raw=1' );
var geo1 = new THREE.PlaneBufferGeometry( 25, 25 );
var material = new THREE.MeshBasicMaterial( { map: map3, side: THREE.DoubleSide } );
            material.transparent = true;
            material.blending = THREE[ blending ];
var mesh = new THREE.Mesh( geo1, material );
            mesh.position.set( 75,70,211 );
            mesh.rotation.x = 5.3;
            mesh.rotation.y = 0.5;
            scene.add( mesh );
var mesh3 = new THREE.Mesh( geo1, material );
            mesh3.position.set( -75,70,211 );
            mesh3.rotation.x = -5.3;
            mesh3.rotation.y = -0.5;
            scene.add( mesh3 );


var map2 = new THREE.TextureLoader().load( 'https://www.dropbox.com/s/bnjf3roi9pigtt9/lensflareRed2.jpg?dl=0&raw=1' );
var geo2 = new THREE.PlaneBufferGeometry( 49, 36 );
var material2 = new THREE.MeshBasicMaterial( { map: map2, side: THREE.DoubleSide } );
            material2.transparent = true;
            material2.opacity = 0.8;
            material2.blending = THREE.AdditiveBlending;
var mesh2 = new THREE.Mesh( geo2, material2 );
            mesh2.position.set( 64,82,-217 );
            mesh2.rotation.y = -0.7;
            scene.add( mesh2 );
var mesh4 = new THREE.Mesh( geo2, material2 );
            mesh4.position.set( -64,82,-217 );
            mesh4.rotation.y = 0.7;
            scene.add( mesh4 );

var sphere = new THREE.SphereBufferGeometry( 0.1, 16, 8 );
light1 = new THREE.PointLight( 0xfffff0, 4, 20 );
        light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xfffff0 } ) ) );
        light1.position.set( 70,65,210 );
        scene.add( light1 );
light2 = new THREE.PointLight( 0xfffff0, 4, 20 );
        light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xfffff0 } ) ) );
        light2.position.set( -70,65,210 );
        scene.add( light2 );

  var customMaterial = new THREE.ShaderMaterial( 
  {
      uniforms:
    {
      "c":   { type: "f", value: 0 },
      "p":   { type: "f", value: 6 },
      glowColor: { type: "c", value: new THREE.Color(0xfffff0) },
      viewVector: { type: "v3", value: camera.position }
    },
    vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0
  }   );

  this.moonGlow = new THREE.Mesh( new THREE.SphereGeometry( 10, 20, 10 ), customMaterial.clone() );
  moonGlow.position.set(70,65,203);
  scene.add( moonGlow );
  this.moonGlow2 = new THREE.Mesh( new THREE.SphereGeometry( 8, 20, 10 ), customMaterial.clone() );
  moonGlow2.position.set(53,65,210);
  scene.add( moonGlow2 );

  this.moonGlow3 = new THREE.Mesh( new THREE.SphereGeometry( 10, 20, 10 ), customMaterial.clone() );
  moonGlow3.position.set(-74,65,203);
  scene.add( moonGlow3 );
  this.moonGlow4 = new THREE.Mesh( new THREE.SphereGeometry( 8, 20, 10 ), customMaterial.clone() );
  moonGlow4.position.set(-57,65,210);
  scene.add( moonGlow4 );

var textureLight = new THREE.TextureLoader().load( "https://www.dropbox.com/s/twbd8eo8vc32pfr/lightcopy.jpg?dl=0&raw=1" );
          var TLight = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 256, 512 ),
            new THREE.MeshBasicMaterial( { map: textureLight, opacity:0.5, transparent: true } )
          );
          TLight.material.blending = THREE.AdditiveBlending;
          TLight.rotation.x = - Math.PI / 2;
          TLight.position.z = 520;
          TLight.position.x = 0;
          TLight.position.y = 0;
          TLight.renderOrder = 2;
          TLight.lightMapIntensity;
          scene.add( TLight );
////////////////////////////////but

var groupLight = new THREE.Group();
groupLight.add( TLight );
groupLight.add( light1 );
groupLight.add( light2 );
groupLight.add( mesh2 );
groupLight.add( mesh );
groupLight.add( mesh3 );
groupLight.add( mesh4 );
groupLight.add( moonGlow2 );
groupLight.add( moonGlow );
groupLight.add( moonGlow3 );
groupLight.add( moonGlow4 );
scene.add( groupLight );
groupLight.visible = false;
var lightOn = false;

Lig.addEventListener("click", function(event) {
  if(lightOn == false)
{
 groupLight.visible = true;
 lightOn = true;
}
else
{
  groupLight.visible = false;
 lightOn = false;
}
});
// GROUND
var gt = new THREE.TextureLoader().load( "https://www.dropbox.com/s/c9c1rrbambk5id8/TARMAC2.jpg?dl=0&raw=1" , function ( map ) {
          map.wrapS = THREE.RepeatWrapping;
          map.wrapT = THREE.RepeatWrapping;
          map.anisotropy = 10;
          map.repeat.set( 8, 8 );
          groundTexture = map;
  } );
var ground = new THREE.Mesh(
          new THREE.PlaneBufferGeometry( 10000, 10000 ),
          new THREE.MeshBasicMaterial( { color: 0xdad8d5,  map: gt} ) );
        ground.rotation.x = - Math.PI / 2;
        ground.position.y = -3;
        ground.receiveShadow = true;
        ground.renderOrder = 1;
        ground.material.envMap = envMap;
        scene.add( ground );


//model
  var loader = new THREE.FBXLoader();

  loader.load('https://www.dropbox.com/s/ju8uzl9ru0acd8v/bmw_opt4.fbx?dl=0&raw=1',
  function (fbx){
    bmw = fbx;
    fbx.add( light );
    fbx.add( lightHolder );

     fbx.traverse( function ( child ) {
            if ( child.isMesh ) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.material.envMap = envMap;
              child.depthWrite = false;
              if(child.name == "body")
        {
          fbxParts.body = child;
          // fbxParts.body.depthWrite = false;
        }
         if(child.name == "glass")
{
  fbxParts.glass = child;
  fbxParts.glass.receiveShadow = false;
}
if(child.name == "all")
    {
      fbxParts.all = child;
      // child.material.color.setHex(0x00FF00);
      child.receiveShadow = false;
      child.castShadow = false;
      // if(child.material.color == "redglass"){
      //   child.diffuse.color = new THREE.Color(0x00FF00);
      // }
    }
    if(child.name == "all001")
    {
      fbxParts.all001 = child;
      child.receiveShadow = false;
      child.castShadow = false;
    }
        if(child.name == "rim_b_l" || child.name == "rim_f_l" || child.name == "rim_b_r" || child.name == "rim_f_r")
        {
         fbxParts.rims.push(child);
        }

         if(child.name == "rim1")
        {
          rims["rims1"] = child;
        }
         if(child.name == "rim2")
        {
          rims["rims2"] = child;
        }
            }
     });

    var newColor;
    var radiosBody = document.getElementsByClassName("radio");

     for(var i = 0; i < radiosBody.length; i++){
      radiosBody[i].onchange = function(e){
        switch ( e.target.value ) {
            case 'Blue': newColor = new THREE.Color( 0x4580ba ); break;
            case 'Red': newColor = new THREE.Color( 0xe82400 ); break;
            case 'White': newColor = new THREE.Color( 0xffffff ); break;
            case 'Gray': newColor = new THREE.Color( 0x8d9197 ); break;
          };
        fbxParts.body.material.color = newColor;
        fbxParts.all.material.color = newColor;
      }
    }

    var radiosWheel = document.getElementsByClassName("radiowheel");
    console.log(radiosWheel);
    for(var i = 0; i < radiosWheel.length; i++){
      radiosWheel[i].onchange = function(e){
        TweenMax.to(window, 1, {speed: 0.001, ease:Power1.easeOut});
        TweenMax.to(window, 1, {delay:2, speed: 0.01, ease:Power1.easeIn});

      camera.position.set(600, 20, -10);
      scene.rotation.y = 21;


        for(var i = 0; i <  fbxParts.rims.length; i++){
            fbxParts.rims[i].geometry = rims[e.target.value].geometry;
            fbxParts.rims[i].material = rims[e.target.value].material;
          }
      }
     }
     var texture = new THREE.TextureLoader().load( "https://www.dropbox.com/s/nfgbrdtbxopp64w/shadow.png?dl=0&raw=1" );
          var shadow = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( 289, 529 ),
            new THREE.MeshBasicMaterial( { map: texture, opacity:0.8, transparent: true } )
          );
          shadow.position.z = -67;
          shadow.position.x = -25;
          shadow.position.y = 0;
          shadow.renderOrder = 2;
          fbx.add( shadow );
    scene.add(fbx);
  },
  function (xhr) {
    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  },
    function (err) {
    console.error( 'An error happened' );
  }
);

// // controls
        var controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI * 0.48;
        controls.minDistance = 400;
        controls.maxDistance = 1000;//
        window.addEventListener( 'resize', onWindowResize, false );

        window.addEventListener( 'resize', onWindowResize, false );

animate();

function animate(){
  requestAnimationFrame(animate);
  scene.rotation.y+=0.001;
  // camera.lookAt(0,0,0);
  // camera.position.set(600, 300, 1000);
  if(groundTexture)
  {
  groundTexture.offset.y -= speed/2;
  groundTexture.needsUpdate = true;
  groundTexture.needsUpdate = false;
  }
  for(var i = 0; i <  fbxParts.rims.length; i++)
  {
  fbxParts.rims[i].rotation.x += speed*22;
  }
}

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }


  var rendering = function () {
    // spotLightHelper.update();
    requestAnimationFrame(rendering);
    controls.update();
// composer2.render();
// finalComposer.render();

    // moonGlow.material.uniforms.viewVector.value =
    // new THREE.Vector3().subVectors( camera.position, moonGlow.position );

    renderer.render(scene, camera);
  };

  rendering();
};


