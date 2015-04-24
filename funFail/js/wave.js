function Wave(center, mesh, vitesse, maxAmplitude, frequence, diameter){
	this.center = center;
	this.mesh = mesh;
	this.vitesse = vitesse;
	this.maxAmplitude = maxAmplitude;
	this.frequence = frequence;
	this.diameter = diameter;
	this.begining = Date.now();

	this.delays = [];
	console.log(this)

	time = 0;
	facteurTime = -((time)*(1/3000))+1;

	for(var i=0 ; i<mesh.geometry.vertices.length ; i++)
	{
		var distance = getDistance(this.center, mesh.geometry.vertices[i]);
		this.delays[i] = distance / this.vitesse;
		var amplitude = getAmplitude(this.maxAmplitude, distance, this.diameter);
		if(amplitude > 0)
			mesh.geometry.vertices[i].y = mesh.geometry.vertices[i].displacement + Math.sin(this.delays[i]*this.frequence)*amplitude*this.facteurTime;
	}

	mesh.geometry.verticesNeedUpdate = true;
}


function getDistance(center, target){

    var dist = {
    	x: target.x - center.x ,
    	z: target.z - center.z
    }

    dist = Math.sqrt(dist.x*dist.x + dist.z*dist.z);
    return dist
}

function getAmplitude(maxAmplitude, distance, diametere){
	var amplitude = (distance * (-maxAmplitude/((depth*margin)/diameter))) + maxAmplitude;

	return amplitude;
}