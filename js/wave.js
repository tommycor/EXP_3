function wave(center, mesh, vitesse){
	var delays = new Array(mesh.geometry.vertices.length);

	for(var i=0 ; i<mesh.geometry.vertices.length ; i++)
	{
		delays[i] = getDistance(center, mesh.geometry.vertices[i])// / vitesse
		mesh.geometry.vertices[i].y = delays[i];
	}
	
	// console.log(delays[0])
	mesh.geometry.verticesNeedUpdate = true;

}

function getDistance(center, target){

    var dist = {
    	x: target.z - center.x ,
    	z: target.z - center.z
    }

    dist = Math.sqrt(dist.x*dist.x + dist.z*dist.z);
	console.log(dist)
    return dist
}