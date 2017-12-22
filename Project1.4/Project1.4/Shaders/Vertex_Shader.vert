#version 330

layout (location = 0) in vec3 Position;
layout (location = 1) in vec3 Normals;
uniform mat4 gModel;
uniform mat4 COT;
out vec3 color;
out vec3 NormalObj;
out vec3 CamPosObj;

void main(){
	gl_Position = gModel * vec4(Position, 1.0);
	color = Normals;
	NormalObj = (COT * vec4(Normals,0.0)).xyz;
	CamPosObj = (COT * vec4(Position,1.0)).xyz;
}