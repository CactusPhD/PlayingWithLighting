#version 330

layout (location = 0) in vec3 position;
layout (location = 1) in vec3 barycentricCoords;

out vec3 baryCoords;

uniform mat4 gModel;

void main(){
	baryCoords = barycentricCoords;
	gl_Position = gModel * vec4(position, 1.0);
}