#version 430

in vec3 color;
in vec3 NormalObj;
in vec3 CamPosObj;
uniform float specularPower;
out vec4 FragColor;

//same struct in main file
struct PointLight{
	vec3 position;
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	vec3 attenuation;
};

struct DirectionalLight{
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	vec3 direction;
};

layout (std430, binding = 0) buffer PointLights{ 
      PointLight pointLights[];
};

layout (std430, binding = 1) buffer DirectionalLights{ 
   DirectionalLight directionalLights[];
};

void main(){
	vec3 matColor = (color * 0.5) + vec3(0.5,0.5,0.5);
	vec3 normal = normalize(NormalObj);
	vec3 viewDir = normalize(-CamPosObj);
	vec3 lightDir = pointLights[0].position - CamPosObj;
	float distance = length(lightDir);
	float attP = 1 / (pointLights[0].attenuation.x * pow(distance,2) + pointLights[0].attenuation.y * distance + pointLights[0].attenuation.z);
	vec3 diffP = pointLights[0].diffuse * max(0,dot(normal,normalize(lightDir)));
	vec3 halfDir = normalize(lightDir + viewDir);
	float specAngle = max(0,dot(halfDir,normal));
	float specVal = pow(specAngle,specularPower);
	vec3 specP = pointLights[0].specular*specVal;
	vec3 ambP = pointLights[0].ambient;
	//Draw only point Light
	//FragColor = vec4(matColor*(ambP + attP*(specP+diffP)),1.0);
	

	lightDir = directionalLights[0].direction;
	vec3 diffD = directionalLights[0].diffuse * max(0,dot(normal,normalize(lightDir)));
	halfDir = normalize(lightDir + viewDir);
	specAngle = max(0,dot(halfDir,normal));
	specVal = pow(specAngle,specularPower);
	vec3 specD = directionalLights[0].specular*specVal;
	vec3 ambD = directionalLights[0].ambient;
	//Draw only directional light
	//FragColor = vec4(matColor*(ambD + specD + diffD),1.0);

	//Draw both lights together
	FragColor = vec4(matColor*((ambD + specD + diffD)+(ambP + attP*(specP+diffP))),1.0);

}