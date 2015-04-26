function Wave(center, mesh, vitesse, maxAmplitude, frequence, diameter, duration){
	this.center = center;
	this.mesh = mesh;
	this.vitesse = vitesse;
	this.maxAmplitude = maxAmplitude;
	this.frequence = frequence;
	this.diameter = diameter;
	this.begining = Date.now();
	this.currentTime = Date.now();
	this.duration = duration;

	this.last = [];
	for (var i=0 ; i<mesh.geometry.vertices.length ; i++)
	{
		this.last[i] = 0;
	}


	this.slower = 50;

	this.delays = [];

	this.update = function(){
		this.currentTime = (Date.now() - this.begining);

		this.facteurTime = -((this.currentTime)*(1/this.duration))+1;


		for(var i=0 ; i<mesh.geometry.vertices.length ; i++)
		{
			var distance = getDistance(this.center, mesh.geometry.vertices[i]);
			this.delays[i] = distance / this.vitesse;
			var amplitude = getAmplitude(this.maxAmplitude, distance, this.diameter);

			if(amplitude > 0){
				var mover = Math.sin((this.delays[i]*this.frequence)-((this.currentTime)/this.slower))*amplitude*this.facteurTime;
				// mesh.geometry.vertices[i].y = mesh.geometry.vertices[i].displacement + Math.sin((this.delays[i]*this.frequence)-((this.currentTime)/this.slower))*amplitude*this.facteurTime;
				mesh.geometry.vertices[i].y = (mesh.geometry.vertices[i].y - this.last[i]) + mover;
				this.last[i] = mover;
			}
			else{
				this.last[i] = 0;
			}
		}
		mesh.geometry.verticesNeedUpdate = true;
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