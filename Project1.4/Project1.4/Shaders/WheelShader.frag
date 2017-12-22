#version 330

in vec3 baryCoords;

out vec4 FragColor;

uniform float trim = 3;
uniform vec3 color = vec3(1, 1, 1);

void main(){
	float mixFactor = trim*min(baryCoords.x, min(baryCoords.y, baryCoords.z));
	vec3 trimmedColor = mix(baryCoords, color, mixFactor);
    FragColor = vec4(trimmedColor, 1.0);
}