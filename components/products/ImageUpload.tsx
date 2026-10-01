'use client';
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from 'react-icons/tb'
import { useState } from 'react';
import Image from 'next/image';
import { getImagePath } from "@/src/utils";

export default function ImageUpload({image} : {image: string | undefined}) {

    const [imageUrl, setImageUrl] = useState('');
    
    return (
        <CldUploadWidget
            // cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
            uploadPreset="ml_default"
            onSuccess={(result, { widget }) => {
                if (result.event === "success") {
                    widget.close();
                    const info = result.info;
                    const imageUrl = typeof info === "object" ? info?.secure_url : undefined;
                    if (imageUrl) setImageUrl(imageUrl);
                }
            }}
            options={{ maxFiles: 1 }}
        >
            {({open}) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">
                            Imagen producto
                        </label>
                        <div 
                            onClick={() => open()}
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col items-center justify-center gap-4 text-neutral-600 bg-slate-100">
                            <TbPhotoPlus 
                                size={50}
                                // className="text-slate-400 w-6 h-6" 
                            />
                            <p className="text-lg font-semibold">
                                Sube una imagen del producto
                            </p>

                            {imageUrl && (
                                <div 
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image 
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        src={imageUrl}
                                        alt="Imagen del producto"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {image && !imageUrl && (
                        <div className="space-y-2">
                            <label>Imagen actual</label>
                            <div className="relative w-64 h-64">
                                <Image 
                                    fill
                                    src={getImagePath(image)}
                                    style={{ objectFit: 'contain' }}
                                    alt="Imagen del producto"
                                />
                            </div>
                        </div>
                    )}

                    <input
                        type="hidden"
                        name="image"
                        defaultValue={imageUrl || image}
                    />
                </>
            )}
        </CldUploadWidget>
    );
}