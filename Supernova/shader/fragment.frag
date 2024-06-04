precision mediump float;

uniform sampler2D uTexture; // Texture uniform

varying vec3 vNormal;
varying vec2 vTexCoord; // Varying variable for texture coordinates

void main() {
    vec4 textureColor = texture2D(uTexture, vTexCoord); // Sample the texture

    // For now, just apply the texture color to the fragment
    gl_FragColor = textureColor;
}
