import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";

export const cld = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo" },
});

// For image thumbnails in the grid
export function getImageUrl(publicId: string, width: number, height: number) {
  return cld
    .image(publicId)
    .resize(fill().width(width).height(height).gravity(autoGravity()))
    .delivery(quality("auto"))
    .delivery(format(auto()))
    .toURL();
}

// For video thumbnails (poster frame)
export function getVideoPosterUrl(publicId: string, width: number, height: number) {
  return cld
    .video(publicId)
    .resize(fill().width(width).height(height))
    .delivery(quality("auto"))
    .delivery(format("jpg"))
    .toURL();
}

// For full video streaming src
export function getVideoUrl(publicId: string) {
  return cld
    .video(publicId)
    .delivery(quality("auto"))
    .delivery(format(auto()))
    .toURL();
}
