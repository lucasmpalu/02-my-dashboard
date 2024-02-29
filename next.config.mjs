/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // configuración para permitir imagenes externas que vengan de images.unsplash.com, ya que son imagenes que no se encuentran en mi proyecto y next no deja subir cualquier cosa
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ]
    }
};

export default nextConfig;
